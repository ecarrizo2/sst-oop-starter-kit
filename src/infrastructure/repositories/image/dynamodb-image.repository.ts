import { ExampleEntity } from '@domain/entities/example/example.entity'
import { Resource } from 'sst'
import { BaseDynamodbRepository } from '@infrastructure/repositories/base-dynamodb.repository'
import { inject, injectable } from 'tsyringe'
import { ImageRepository } from '@domain/repositories/image/image-repository.interface'
import { LoggerService } from '@shared/logger/logger.service'
import { Logger } from '@shared/logger/logger.interface'
import { QueryCommandInput } from '@aws-sdk/lib-dynamodb/dist-types/commands/QueryCommand'

/**
 * Repository class for managing Image entities in DynamoDB.
 * Extends the BaseDynamodbRepository to provide specific implementations for ExampleEntity.
 */
@injectable()
export class DynamodbImageRepository extends BaseDynamodbRepository<ExampleEntity> implements ImageRepository {
  entityClass = ExampleEntity

  /**
   * The name of the DynamoDB table.
   */
  protected readonly tableName = Resource.ImageDynamo.name

  constructor(@inject(LoggerService) logger: Logger) {
    super(logger)
  }

  /**
   * Finds an ExampleEntity by its URL.
   *
   * @param {string} url - The URL of the image.
   * @returns {Promise<ExampleEntity | null>} - The ExampleEntity or null if not found.
   */
  async findByUrl(url: string): Promise<ExampleEntity | null> {
    const queryCommandParams: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: 'ImageUrlIndex',
      KeyConditionExpression: '#url = :url',
      ExpressionAttributeNames: {
        '#url': 'url',
      },
      ExpressionAttributeValues: {
        ':url': url,
      },
      Limit: 1,
    }

    return this.runQuery(queryCommandParams)
  }
}
