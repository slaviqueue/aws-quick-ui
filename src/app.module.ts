import { Module } from '@nestjs/common'
import { SqsModule } from './sqs/sqs.module'
import { S3Module } from './s3/s3.module'
import { AppController } from './app.controller'
import { SnsModule } from './sns/sns.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    SqsModule, 
    S3Module, 
    SnsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
