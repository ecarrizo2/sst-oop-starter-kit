import { APIGatewayEvent } from 'aws-lambda'
import { initializeRequestContainer } from '@interfaces/shared/container-initialization.helper'
import { container } from 'tsyringe'
import { RequestHandlerService } from '@interfaces/http/services/request-handler.service'

export const handleRequest = <ResponseType>(
  event: APIGatewayEvent,
  callback: (event: APIGatewayEvent) => Promise<ResponseType>
) => {
  initializeRequestContainer(event)
  const responseHandler = container.resolve(RequestHandlerService)

  return responseHandler.handle(
    callback(event)
  )
}
