import { Module } from '@nestjs/common'
import { SnsService } from './sns.service'
import { SnsController } from './sns.controller'

@Module({
  providers: [SnsService],
  controllers: [SnsController],
})
export class SnsModule {}
