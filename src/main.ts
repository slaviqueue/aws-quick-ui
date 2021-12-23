import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { config as awsConfig } from 'aws-sdk'
import { join } from 'path'
import { AppModule } from './app.module'

const open = require('open')

awsConfig.update({
  accessKeyId: 'foobar',
  secretAccessKey: 'foobar',
  region: 'localhost',
  logger: process.stdout,
})

const isProd = process.env.NODE_ENV === 'prod'
const serverPort = isProd ? 0 : 3000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('pug')

  const server = await app.listen(serverPort)
  const port = server.address().port

  const logger = new Logger('App')
  logger.log(`Started on http://localhost:${port}`)

  if (isProd) {
    open(`http://localhost:${port}`)
  }
}

bootstrap()
