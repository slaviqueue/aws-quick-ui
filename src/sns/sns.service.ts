import { Injectable } from '@nestjs/common'
import { SNS } from 'aws-sdk'
import { PostMessageDTO } from './dto/post-message.dto'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SnsService {

  private readonly sns: SNS;
  constructor(private readonly config: ConfigService) {
    this.sns = new SNS({ 
      endpoint: this.config.get<string>('aws.endpoint'),
      region: this.config.get<string>('aws.region'),
    })
  }

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
