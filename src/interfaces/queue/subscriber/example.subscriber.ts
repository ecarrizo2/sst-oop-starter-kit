import 'reflect-metadata'
import { container } from 'tsyringe'
import { initializeQueueContainer } from '@interfaces/shared/container-initialization.helper'
import { BaseError } from '@shared/errors/base.error'
import { LoggerService } from '@shared/logger/logger.service'

/**
 * Handle a Queue Event this Queue and its handler is used to process SQS messages
 * The Queue messages will be processed one by one instead of using batch operations
 * TODO/Note: This handler assumes that the event only send one record at a time.
 * TODO2: Try catch can be moved to a common place to avoid repetition cross-subscribers
 *
 */
export const handle = (event: AWSLambda.SQSEvent) => {
  const record = event.Records[0]
  initializeQueueContainer(record)
  const logger = container.resolve(LoggerService)

  try {
    return { batchItemFailures: [] }
  } catch (error) {
    logger.error(error)
    const customInstance = error instanceof BaseError
    const isReprocessable = customInstance && !error.nonReprocessable
    const isNotCustomError = !customInstance

    if (isReprocessable || isNotCustomError) {
      logger.debug(`Message is reprocessable, making it visible again`, { messageId: record.messageId })
      return { batchItemFailures: [{ itemIdentifier: record.messageId }] }
    }
  }

  return { batchItemFailures: [] }
}
