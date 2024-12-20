export interface BaseSQSRecordBody {
  traceId?: string
}

export interface ExampleSQSRecordBody extends BaseSQSRecordBody {
  exampleValue: string
}
