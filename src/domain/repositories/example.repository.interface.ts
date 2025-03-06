import { Repository } from '@domain/repositories/repository.interface'
import { ExampleEntity } from '@domain/entities/example.entity'

export interface ExampleRepository extends Repository<ExampleEntity> {
  findBy(filter: string): Promise<ExampleEntity | null>
}
