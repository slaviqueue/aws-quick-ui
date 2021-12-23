import { Body, Controller, Get, Post, Query, Render, Response } from '@nestjs/common'
import { PostMessageDTO } from './dto/post-message.dto'
import { SnsService } from './sns.service'

@Controller('sns')
export class SnsController {
  public constructor(private readonly snsService: SnsService) {}

  @Get('topics')
  @Render('sns-topics')
  public async getTopics() {
    const { Topics } = await this.snsService.getTopics()

    return {
      topics: Topics,
    }
  }

  @Get('topics/view')
  @Render('sns-topic')
  public async getTopic(@Query('topicArn') topicArn: string) {
    const topicInfo = await this.snsService.getTopicInfo(topicArn)

    return {
      topicArn,
      subscriptions: topicInfo.subscriptions,
      attributes: topicInfo.attributes,
    }
  }

  @Get('topics/message/success')
  @Render('sns-message-post-success')
  public onPostMessgaeSuccess() {}

  @Post('topics/message')
  public async postMessageToTopic(
    @Query('topicArn') topicArn: string,
    @Body() messagePayload: PostMessageDTO,
    @Response() res,
  ) {
    const messageAttributes = messagePayload.messageAttributes ? JSON.parse(messagePayload.messageAttributes) : {}
    const message = { ...messagePayload, messageAttributes }

    await this.snsService.postMessage(topicArn, message)

    res.redirect('/sns/topics/message/success')
  }
}
