/// <reference path="./.sst/platform/config.d.ts" />

const environment = {
  LOG_LEVEL: 'debug',
}

const exampleQueue = () => {
  const deadLetterQueue = new sst.aws.Queue('ExampleDeadLetterQueue')
  const queue = new sst.aws.Queue('ExampleQueue', {
    dlq: { queue: deadLetterQueue.arn, retry: 5 },
  })

  // Create the Subscriber
  queue.subscribe(
    {
      handler: 'src/interfaces/queue/subscriber/example-subscriber.handle',
      link: [],
    },
    {
      batch: {
        partialResponses: true,
        size: 1,
      },
    },
  )

  return queue
}

const exampleAPI = (exampleQueueResource: any) => {
  const exampleAPIResource = new sst.aws.ApiGatewayV2('ExampleAPI')
  exampleAPIResource.route('POST /', {
    handler: 'src/interfaces/http/handlers/eample-request-handler.handle',
    link: [exampleQueueResource],
    environment,
  })

  return exampleAPIResource
}

export default $config({
  app(input: { stage: string }) {
    return {
      name: 'sst-oop-starter-kit',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },

  async run() {
    const exampleQueueResource = exampleQueue()
    const exampleAPIResource = exampleAPI(exampleQueueResource)

    return {
      exampleSQS: exampleQueueResource.url,
      exampleAPI: exampleAPIResource.url
    }
  },
})
