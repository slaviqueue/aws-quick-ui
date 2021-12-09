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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('pug')

  const server = await app.listen(0)
  const port = server.address().port

  open(`http://localhost:${port}`)
}

bootstrap()
