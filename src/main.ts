import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { config as awsConfig } from 'aws-sdk'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'
import * as open from 'open'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get<ConfigService>(ConfigService)

  const port = configService.get<number>('port')

  awsConfig.update({
    accessKeyId: configService.get<string>('aws.accessKey'),
    secretAccessKey: configService.get<string>('aws.accessSecret'),
    region: configService.get<string>('aws.region'),
    logger: process.stdout,
  })

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('pug')

  await app.listen(port)
  const logger = new Logger('App')
  logger.log(`Started on http://localhost:${port}`)

  open(`http://localhost:${port}`)
}

bootstrap()
