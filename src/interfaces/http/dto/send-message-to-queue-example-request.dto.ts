import { Exclude, Expose } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

@Exclude()
export class SendMessageToQueueExampleRequestDto {
  @IsString()
  @Expose()
  value1!: string

  @IsNumber()
  @Expose()
  value2!: number
}
