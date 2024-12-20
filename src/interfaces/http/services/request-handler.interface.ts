import { APIGatewayProxyResult } from 'aws-lambda'

export interface RequestHandler {
  handle: (resolvingPromise: Promise<unknown>) => Promise<APIGatewayProxyResult>
}
