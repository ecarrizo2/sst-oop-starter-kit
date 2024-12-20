import { inject, injectable } from 'tsyringe'
import OpenAI from 'openai'
import { Resource } from 'sst'
import { ImageAnalysisResult } from '@domain/value-objects/image/image-analysis-result.vo'
import { LoggerService } from '@shared/logger/logger.service'
import { ImageAnalyserService } from '@domain/services/image/image-analyser.interface'
import { Logger } from '@shared/logger/logger.interface'
import { ImageAnalyserInput } from '@domain/value-objects/image/image-analyser-input.vo'
import { ChatCompletionMessageParam } from 'openai/resources'

const apiKey = Resource.OpenaiApiKey.value

@injectable()
export class OpenAIImageAnalyserService implements ImageAnalyserService {
  openai = new OpenAI({
    apiKey,
  })

  constructor(@inject(LoggerService) private readonly logger: Logger) {}

  async analyseImage(imageData: ImageAnalyserInput): Promise<ImageAnalysisResult> {
    this.logger.debug('getAnalyzedImageResult()')
    const message = this.createImageAnalysisRequest(imageData)

    const openaiVisionRequest = { model: 'gpt-4o-mini', messages: [message], max_tokens: 300 }
    this.logger.debug('About to execution vision request: ', openaiVisionRequest)

    const openaiImageAnalysisResult = await this.openai.chat.completions.create(openaiVisionRequest)
    this.logger.debug('Analysed Image Result', openaiImageAnalysisResult)

    const hasChoices = openaiImageAnalysisResult?.choices?.length > 0
    const text = hasChoices ? (openaiImageAnalysisResult.choices[0]?.message?.content ?? '') : ''

    return ImageAnalysisResult.from({
      text,
      vendor: 'openai',
      raw: JSON.stringify(openaiImageAnalysisResult),
    })
  }

  private createImageAnalysisRequest(imageData: ImageAnalyserInput): ChatCompletionMessageParam {
    const message: ChatCompletionMessageParam = {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: {
            url: imageData.url,
          },
        },
      ],
    }

    if (imageData.prompt && message.content instanceof Array) {
      message.content.push({ type: 'text', text: imageData.prompt })
    }

    return message
  }
}
