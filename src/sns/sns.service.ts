import { Injectable } from '@nestjs/common'
import { SNS } from 'aws-sdk'
import { PostMessageDTO } from './dto/post-message.dto'

@Injectable()
export class SnsService {
  private readonly sns = new SNS({ endpoint: 'http://localhost:4566', region: 'us-east-1' })

  public getTopics() {
    return this.sns.listTopics().promise()
  }

  public async getTopicInfo(topicArn: string) {
    const { Subscriptions } = await this.sns.listSubscriptionsByTopic({ TopicArn: topicArn }).promise()
    const { Attributes } = await this.sns.getTopicAttributes({ TopicArn: topicArn }).promise()

    return {
      subscriptions: Subscriptions,
      attributes: Attributes,
    }
  }

  public async postMessage(topicArn: string, messagePayload) {
    await this.sns
      .publish({
        TopicArn: topicArn,
        MessageAttributes: messagePayload.messageAttributes,
        MessageGroupId: messagePayload.messageGroupId,
        Message: messagePayload.messageBody,
      })
      .promise()
  }
}
