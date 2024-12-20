/// <reference path="./.sst/platform/config.d.ts" />

const environment = {
  LOG_LEVEL: 'debug',
}

const addExampleQueueResource = (...args: any[]) => {
  const deadLetterQueue = new sst.aws.Queue('ProcessImageDeadLetterQueue')
  const queue = new sst.aws.Queue('ProcessImageQueue', {
    dlq: {
      queue: deadLetterQueue.arn,
      retry: 5,
    },
  })

  queue.subscribe(
    {
      handler: 'src/interfaces/queue/subscriber/process-image-job-subscriber.handle',
      link: [...args],
    },
    {
      batch: {
        partialResponses: true,
        size: 1,
      },
    }
  )

  return queue
}

export default $config({
  app(input) {
    return {
      name: 'media-accessibility-ia-converter',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },

  async run() {
    const openaiApiKey = new sst.Secret('OpenaiApiKey')
    const imageDynamo = getImageDynamo()
    const jobDynamo = getJobDynamo()

    const processImageQueue = getProcessImageJobQueue(openaiApiKey, jobDynamo, imageDynamo)

    const api = new sst.aws.ApiGatewayV2('Api')
    api.route('POST /process-image-async', {
      handler: 'src/interfaces/http/handlers/image/process-image-request-async-handler.handle',
      link: [jobDynamo, processImageQueue],
      environment,
    })

    api.route('POST /process-image-sync', {
      handler: 'src/interfaces/http/handlers/image/process-image-request-sync-handler.handle',
      link: [jobDynamo, processImageQueue, openaiApiKey, imageDynamo],
      environment,
    })

    const bucket = new sst.aws.Bucket('SpeechBucket', {
      access: 'public',
    })

    api.route('POST /process-text-sync', {
      handler: 'src/interfaces/http/handlers/text/text-to-speech-handler.handle',
      link: [openaiApiKey, bucket],
      environment,
    })
  },
})
