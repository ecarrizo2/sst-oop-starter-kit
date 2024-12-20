import { BaseError } from '@shared/errors/base.error'

export class HttpError extends BaseError {
  status: number
  message: string
  name: string

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
    this.name = this.constructor.name
  }
}
