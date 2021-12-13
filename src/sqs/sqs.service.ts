import { Injectable } from '@nestjs/common'
import { SQS } from 'aws-sdk'

@Injectable()
export class SqsService {
  private readonly sqs = new SQS({ endpoint: 'http://localhost:4576' })

  public getQueueUrls() {
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
