import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { SqsController } from './sqs.controller';

@Module({
  providers: [SqsService],
  controllers: [SqsController]
})
export class SqsModule {}
