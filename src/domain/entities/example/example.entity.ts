import { BaseEntity } from '@domain/entities/base.entity'
import { IsDateString, IsNumber, IsString } from 'class-validator'
import { Exclude, Expose, plainToInstance } from 'class-transformer'
import { myValidateOrReject } from '@shared/class-validator/validator.helper'

/**
 * Interface representing an Image and its Analysis Metadata.
 */
export interface Example {
  /** The unique identifier of the image. */
  id: string

  value1: string

  value2: number

  /** The date and time when the image was last updated (optional). */
  updatedAt: string
}

/**
 * Class representing an image entity.
 */
@Exclude()
export class ExampleEntity implements Example, BaseEntity {
  @IsString()
  @Expose()
  id!: string

  @IsString()
  @Expose()
  value1!: string

  @IsNumber()
  @Expose()
  value2!: number

  @IsDateString()
  @Expose()
  createdAt!: string

  @IsDateString()
  @Expose()
  updatedAt!: string

  static async from(init: Example) {
    const instance = plainToInstance(ExampleEntity, init, { excludeExtraneousValues: true })
    await myValidateOrReject(instance)

    return instance
  }

  async validateState() {
    return myValidateOrReject(this)
  }
}
