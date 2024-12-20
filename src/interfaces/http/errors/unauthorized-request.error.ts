import { HttpError } from '@interfaces/http/errors/http.error'
import { HttpStatusCode } from '@interfaces/http/types/http-status-code.enum'

export class UnauthorizedRequestError extends HttpError {
  constructor(message: string) {
    super(HttpStatusCode.UNAUTHORIZED, message)
  }
}
