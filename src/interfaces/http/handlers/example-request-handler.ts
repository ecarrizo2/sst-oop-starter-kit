import 'reflect-metadata'
import { Resource } from "sst";
import { container } from 'tsyringe'
import { LoggerService } from '@shared/logger/logger.service'
import { getValidatedRequestInputValueObject } from '@interfaces/http/aws-http-api-gateway-event.helper'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { handleRequest } from '@interfaces/http/handlers/request-handler.helper'
import { ExampleRequestDto } from '@interfaces/http/dto/example-request.dto'
import { SQSClientService } from '@infrastructure/services/aws/sqs-client.service'
import { ExampleService } from '@application/services/example-service'

/**
 * Example Handler for a Given Request with input validation
 *
 * @param {APIGatewayEvent} event - The API Gateway event.
 * @returns {Promise<APIGatewayProxyResult>} - The API Gateway proxy result.
 */
export async function handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  return handleRequest(event, async (eventArg: APIGatewayEvent) => {
    const logger = container.resolve(LoggerService)
    logger.info('HTTP Request received', eventArg)

    // Do some in-line processing
    const input = await getValidatedRequestInputValueObject(event, ExampleRequestDto)
    const applicationHandler = container.resolve(ExampleService)
    const result = await applicationHandler.exampleWork(input)

    // Send a message to the queue
    const enqueuementService = container.resolve(SQSClientService)
    await enqueuementService.send(Resource.ExampleQueue.url, {
      input,
    })

    return {
      message: 'Image Created Successfully',
    }
  })
}
