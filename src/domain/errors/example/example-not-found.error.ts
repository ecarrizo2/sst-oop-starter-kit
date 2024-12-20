import { BaseError } from '@shared/errors/base.error'

/**
 * Error thrown when a job for a query was not found.
 */
export class ExampleNotFound extends BaseError {
  nonReprocessable = true

  constructor() {
    super('Example not found')
  }
}
