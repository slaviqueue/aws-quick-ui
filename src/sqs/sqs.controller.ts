import { Body, Controller, Get, Post, Query, Render, Response } from '@nestjs/common'
import { Response as TResponse } from 'express'
import { noop } from 'lodash'
import { PostMessageDTO } from './dto/post-message.dto'
import { SqsService } from './sqs.service'

@Controller('sqs')
export class SqsController {
  public constructor(private readonly sqsService: SqsService) {}

  @Get('/queues')
  @Render('sqs-queues')
  public async getQueues() {
    const queueUrls = await this.sqsService.getQueueUrls()
    return { queueUrls: queueUrls ?? [] }
  }

  @Get('/queues/view')
  @Render('sqs-queue')
  public async getQueue(@Query('queueUrl') queueUrl: string) {
    return { queueUrl }
  }

  @Get('/queues/message/success')
  @Render('sqs-message-post-success')
  public onPostMessageSuccessfully() {
    noop()
  }

  @Post('/queues/message')
  @Render('sqs-queue')
  public async postMessageToQueue(
    @Query('queueUrl') queueUrl: string,
    @Body() messageData: PostMessageDTO,
    @Response() res: TResponse,
  ) {
    await this.sqsService
      .postMessageTo(queueUrl, messageData.messageBody, messageData.messageGroupId)
      .catch(console.log)
    res.redirect('/sqs/queues/message/success')
  }
}
