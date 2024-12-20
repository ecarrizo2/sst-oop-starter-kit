import { inject, injectable } from 'tsyringe'
import { LoggerService } from '@shared/logger/logger.service'
import { Logger } from '@shared/logger/logger.interface'
import { Resource } from 'sst'
import { SQSClientService } from '../../../infrastructure/services/aws/sqs-client.service'
import { SendMessageToQueueExampleRequestDto } from '@interfaces/http/dto/send-message-to-queue-example-request.dto'

@injectable()
export class ExampleQueueEventSchedulerService {
  constructor(
    @inject(LoggerService) private readonly logger: Logger,
    @inject(SQSClientService) private readonly sqs: SQSClientService,
  ) {}

  async sendExampleMessageToQueue(input: SendMessageToQueueExampleRequestDto): Promise<{id: string|undefined}> {
    this.logger.info('Sending Job processing request to the queue')
    const sendMessageCommandOutput = await this.sqs.send(Resource.ProcessImageQueue.url, {
      input
    })

    return { id: sendMessageCommandOutput.MessageId }
  }
}
