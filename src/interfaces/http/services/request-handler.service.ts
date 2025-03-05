import { APIGatewayProxyResult } from 'aws-lambda'
import { RequestHandler } from '@interfaces/http/services/request-handler.interface'
import { Logger } from '@shared/logger/logger.interface'
import { LoggerService } from '@shared/logger/logger.service'
import { inject, injectable } from 'tsyringe'
import { BadRequestError } from '@interfaces/http/errors/bad-request.error'
import { BadRequestResponse, InternalServerErrorResponse, Response } from '@interfaces/http/types/response.interface'
import { HttpStatusCode } from '@interfaces/http/types/http-status-code.enum'
import { ForbiddenRequestError } from '@interfaces/http/errors/forbidden-request.error'
import { HttpError } from '@interfaces/http/errors/http.error'
import { UnauthorizedRequestError } from '@interfaces/http/errors/unauthorized-request.error'

@injectable()
export class RequestHandlerService implements RequestHandler {
  constructor(@inject(LoggerService) private readonly logger: Logger) {
  }

  async handle(resolvingPromise: Promise<unknown>): Promise<APIGatewayProxyResult> {
    try {
      const promiseResult = await resolvingPromise
      return this.successResponse(promiseResult)
    } catch (error) {

      if (error instanceof HttpError) {
        return this.handleHTTPError(error)
      }

      this.logger.error('Internal Error', error)
      return this.internalServerError()
    }
  }

  private successResponse = (body: unknown) => {
    return this.toAPIGatewayProxyResult({
      status: HttpStatusCode.OK,
      body: body,
    })
  }

  private handleHTTPError = (error: HttpError) => {
    if (error instanceof BadRequestError) {
      return this.badRequestResponse(error)
    }

    if (error instanceof UnauthorizedRequestError) {
      return this.unauthorizedRequestResponse(error)
    }

    if (error instanceof ForbiddenRequestError) {
      return this.forbiddenRequestResponse(error)
    }

    // TODO: Add support to other status codes and examples?
    return this.internalServerError()
  }

  private badRequestResponse = (error: BadRequestError) => {
    const errors = error.validationErrors?.map((err) => ({
      field: err.property,
      message: Object.values(err.constraints || {}).join(', '),
    }))

    const response: BadRequestResponse = {
      status: HttpStatusCode.BAD_REQUEST,
      body: {
        message: error.message,
        errors,
      },
    }

    return this.toAPIGatewayProxyResult(response)
  }

  private unauthorizedRequestResponse = (error: UnauthorizedRequestError) => {
    return this.toAPIGatewayProxyResult({
      status: error.status,
      body: {
        message: '401 Unauthorized: could not authenticate request.',
      },
    })
  }

  private forbiddenRequestResponse = (error: UnauthorizedRequestError) => {
    return this.toAPIGatewayProxyResult({
      status: error.status,
      body: {
        message: '403 Forbidden: You do not have permission to perform operation or access this resource.',
      },
    })
  }

  private internalServerError = () => {
    const response: InternalServerErrorResponse = {
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      body: {
        message: '500 Internal Server Error.',
      },
    }

    return this.toAPIGatewayProxyResult(response)
  }

  private toAPIGatewayProxyResult(response: Response): APIGatewayProxyResult {
    return {
      statusCode: response.status,
      body: JSON.stringify(response.body),
    }
  }
}
