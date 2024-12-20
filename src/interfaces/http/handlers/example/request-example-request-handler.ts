import 'reflect-metadata'
import { container } from 'tsyringe'
import { LoggerService } from '@shared/logger/logger.service'
import { getValidatedRequestInputValueObject } from '@interfaces/http/aws-http-api-gateway-event.helper'
import { instanceToPlain } from 'class-transformer'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { handleRequest } from '@interfaces/http/handlers/request-handler'
import { SendMessageToQueueExampleRequestDto } from '@interfaces/http/dto/send-message-to-queue-example-request.dto'
import {
  ExampleQueueEventSchedulerService,
} from '@application/services/example/example-queue-event-scheduler.service'

/**
 * The main handler function for processing image requests.
 *
 * @param {APIGatewayEvent} event - The API Gateway event.
 * @returns {Promise<APIGatewayProxyResult>} - The API Gateway proxy result.
 */
export async function handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  return handleRequest(event, async (event: APIGatewayEvent) => {
    const logger = container.resolve(LoggerService)
    logger.info('HTTP Request received', event)

    const service = container.resolve(ExampleQueueEventSchedulerService)
    const input = await getValidatedRequestInputValueObject(
      event,
      SendMessageToQueueExampleRequestDto,
    )

    const enqueueResult = await service.sendExampleMessageToQueue(input)
    return {
      message: 'Message sent to queue',
      messageId: enqueueResult.id
    }
  })
}
