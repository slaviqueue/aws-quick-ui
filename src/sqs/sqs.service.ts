import { Injectable } from '@nestjs/common'
import { SQS } from 'aws-sdk'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SqsService {
  private readonly sqs: SQS

  public constructor(private readonly config: ConfigService) {
    this.sqs = new SQS({
      endpoint: this.config.get<string>('aws.endpoint'),
      region: this.config.get<string>('aws.region'),
    })
  }

  public async getQueueUrls() {
    return this.sqs
      .listQueues()
      .promise()
      .then((res) => res.QueueUrls)
  }

  public async postMessageTo(queueUrl: string, messageBody: string, messageGroupId: string) {
    await this.sqs
      .sendMessage({ MessageBody: messageBody, QueueUrl: queueUrl, MessageGroupId: messageGroupId })
      .promise()
  }
}
