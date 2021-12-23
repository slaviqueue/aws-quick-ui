import { Module } from '@nestjs/common'
import { SqsModule } from './sqs/sqs.module'
import { S3Module } from './s3/s3.module'
import { AppController } from './app.controller'
import { SnsModule } from './sns/sns.module';

@Module({
  imports: [SqsModule, S3Module, SnsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
