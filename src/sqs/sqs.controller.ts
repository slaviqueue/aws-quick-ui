import { Controller, Get, Param, Query, Render } from '@nestjs/common'
import { SqsService } from './sqs.service'

@Controller('sqs')
export class SqsController {
  public constructor(private readonly sqsService: SqsService) {}

  @Get('/queues')
  @Render('sqs-queues')
  public async getQueues() {
    const queueUrls = await this.sqsService.getQueueUrls()
    return { queueUrls }
  }

  @Get('/queues/view')
  @Render('sqs-queue')
  public async getQueue(@Query('queueUrl') queueUrl: string) {
    return { queueUrl }
  }

  @Get('/sqs/queues/view')
  @Render('sqs-queue')
  public async postMessageToQueue(@Query('queueUrl') queueUrl: string) {
    return { queueUrl }
  }
}
