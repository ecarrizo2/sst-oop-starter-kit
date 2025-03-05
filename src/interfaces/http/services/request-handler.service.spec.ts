import { RequestHandlerService } from '@interfaces/http/services/request-handler.service'
import { LoggerService } from '@shared/logger/logger.service'
import { BadRequestError } from '@interfaces/http/errors/bad-request.error'
import { createMock } from '@golevelup/ts-jest'
import { HttpStatusCode } from '@interfaces/http/types/http-status-code.enum'

describe('RequestHandlerService', () => {
  let requestHandlerService: RequestHandlerService
  let logger: LoggerService

  beforeEach(() => {
    logger = createMock<LoggerService>()
    requestHandlerService = new RequestHandlerService(logger)
  })

  afterEach(jest.resetAllMocks)

  it('returns success response when promise resolves', async () => {
    const resolvingPromise = Promise.resolve({ data: 'test' })
    const result = await requestHandlerService.handle(resolvingPromise)
    expect(result.statusCode).toBe(HttpStatusCode.OK)
    expect(result.body).toBe(JSON.stringify({ data: 'test' }))
  })

  it('returns bad request response when promise rejects with BadRequestError', async () => {
    const error = new BadRequestError('Invalid request')
    const resolvingPromise = Promise.reject(error)
    const result = await requestHandlerService.handle(resolvingPromise)

    expect(result.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
    expect(result.body).toBe(JSON.stringify({ message: 'Invalid request', errors: undefined }))
  })

  // TODO: This test can be more robust adding additional handling for the ValidationErrors objects
  it('returns bad request with errors response when promise rejects with BadRequestError', async () => {
    const error = new BadRequestError('Invalid request', [
      { property: 'field', constraints: { isNotEmpty: 'Field is required' } },
    ])
    const resolvingPromise = Promise.reject(error)
    const result = await requestHandlerService.handle(resolvingPromise)
    expect(result.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
    expect(result.body).toBe(
      JSON.stringify({ message: 'Invalid request', errors: [{ field: 'field', message: 'Field is required' }] })
    )
  })

  it('returns bad request with errors response when promise rejects with BadRequestError and empty constraints', async () => {
    const error = new BadRequestError('Invalid request', [{ property: 'field' }])
    const resolvingPromise = Promise.reject(error)
    const result = await requestHandlerService.handle(resolvingPromise)
    expect(result.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
    expect(result.body).toBe(JSON.stringify({ message: 'Invalid request', errors: [{ field: 'field', message: '' }] }))
  })

  it('returns internal server error response when promise rejects with other errors', async () => {
    const error = new Error('Internal error')
    const resolvingPromise = Promise.reject(error)
    const result = await requestHandlerService.handle(resolvingPromise)
    expect(logger.error).toHaveBeenCalledWith('Internal Error', error)
    expect(result.statusCode).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR)
    expect(result.body).toBe(JSON.stringify({ message: '500 Internal Server Error.' }))
  })
})
