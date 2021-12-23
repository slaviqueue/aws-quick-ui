import { Injectable } from '@nestjs/common'
import { SNS } from 'aws-sdk'

@Injectable()
export class SnsService {
  private readonly sns = new SNS({ endpoint: 'http://localhost:4566', region: 'us-east-1' })

  public getTopics() {
    return this.sns.listTopics().promise()
  }
}
