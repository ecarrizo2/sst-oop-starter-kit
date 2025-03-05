import { Transform } from 'class-transformer'

export function TransformJsonObject(): PropertyDecorator {
  return Transform(
    ({ value }: { value: unknown }) => {
      if (typeof value === 'string') {
        return JSON.parse(value) as unknown
      }

      return value
    },
    { toClassOnly: true }
  )
}
