import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { config as awsConfig } from 'aws-sdk'
import { join } from 'path'
import { AppModule } from './app.module'

const open = require('open')

awsConfig.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.LOCALSTACK_REGION,
  logger: process.stdout,
})

const appPort = parseInt(process.env.APP_PORT ?? '3000', 10);


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('pug')

  const server = await app.listen(appPort)
  const port = server.address().port

  const logger = new Logger('App')
  logger.log(`Started on http://localhost:${port}`)

  open(`http://localhost:${port}`)
}

bootstrap()
