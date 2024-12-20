import { HttpError } from '@interfaces/http/errors/http.error'
import { HttpStatusCode } from '@interfaces/http/types/http-status-code.enum'

export class ForbiddenRequestError extends HttpError {
  constructor(message: string) {
    super(HttpStatusCode.FORBIDDEN, message)
  }
}
