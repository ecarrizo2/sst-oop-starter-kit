import { BaseEntity } from '@domain/entities/base.entity'
import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator'
import { Exclude, Expose, plainToInstance } from 'class-transformer'
import { myValidateOrReject } from '@shared/class-validator/validator.helper'

export interface CustomizationMessage {
  prompt: string
  designStyles: string[]
  template: string
}

@Exclude()
export class CustomizationMessageVO implements CustomizationMessage {
  @IsString()
  @Expose()
  prompt!: string

  @IsArray()
  @Expose()
  designStyles!: string[]

  @IsString()
  @Expose()
  template!: string

  static async from(init: CustomizationMessage) {
    const instance = plainToInstance(CustomizationMessageVO, init, { excludeExtraneousValues: true })
    await myValidateOrReject(instance)

    return instance
  }
}
