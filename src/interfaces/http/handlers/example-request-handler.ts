import 'reflect-metadata'
import { container } from 'tsyringe'
import { LoggerService } from '@shared/logger/logger.service'
import { getValidatedRequestInputValueObject } from '@interfaces/http/aws-http-api-gateway-event.helper'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { handleRequest } from '@interfaces/http/handlers/request-handler.helper'
import { ExampleRequestDto } from '@interfaces/http/dto/example-request.dto'

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

    const input = await getValidatedRequestInputValueObject(event, ExampleRequestDto)

    logger.debug('Request input', input)
    return {
      message: 'Request validated',
      input,
    }
  })
}
