import { BaseEntity } from '@domain/entities/base.entity'
import { IsDateString, IsNumber, IsString } from 'class-validator'
import { Exclude, Expose, plainToInstance } from 'class-transformer'
import { myValidateOrReject } from '@shared/class-validator/validator.helper'

export interface Example {
  id: string

  value1: string

  value2: number

  updatedAt: string
}

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
