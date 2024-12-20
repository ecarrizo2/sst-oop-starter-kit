import { Repository } from '@domain/repositories/repository.interface'
import { ExampleEntity } from '@domain/entities/example/example.entity'

export interface ExampleRepository extends Repository<ExampleEntity> {
  findByValue1(value1: string): Promise<ExampleEntity | null>
}
