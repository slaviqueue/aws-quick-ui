import { Module } from '@nestjs/common'
import { SqsModule } from './sqs/sqs.module'
import { S3Module } from './s3/s3.module'
import { AppController } from './app.controller'

@Module({
  imports: [SqsModule, S3Module],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
