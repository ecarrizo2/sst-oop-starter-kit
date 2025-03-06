/* tslint:disable */

import "sst"
declare module "sst" {
  export interface Resource {
    "ExampleAPI": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "ExampleDeadLetterQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "ExampleQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
  }
}
export {}
