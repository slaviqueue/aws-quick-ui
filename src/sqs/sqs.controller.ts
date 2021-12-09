import { Controller, Get, Render } from '@nestjs/common'
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
}
