import { inject, injectable } from 'tsyringe'
import { LoggerService } from '@shared/logger/logger.service'
import { Logger } from '@shared/logger/logger.interface'
import { ExampleRequestDto } from '@interfaces/http/dto/example-request.dto'

@injectable()
export class ExampleService {
  constructor(
    @inject(LoggerService) private readonly logger: Logger,
  ) {}

  async exampleWork(input: ExampleRequestDto): Promise<any> {

  }
}
