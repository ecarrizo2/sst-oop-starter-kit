import { ValidationError } from 'class-validator'
import { HttpError } from '@interfaces/http/errors/http.error'
import { HttpStatusCode } from '@interfaces/http/types/http-status-code.enum'

export class BadRequestError extends HttpError {
  validationErrors: ValidationError[] | undefined

  constructor(message: string, validationErrors?: ValidationError[]) {
    super(HttpStatusCode.BAD_REQUEST, message)
    this.validationErrors = validationErrors
  }
}
