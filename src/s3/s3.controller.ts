import { Controller, Get, Param, Render, Response } from '@nestjs/common'
import { S3Service } from './s3.service'

@Controller('s3')
export class S3Controller {
  public constructor(private readonly s3Service: S3Service) {}

  @Get('/buckets')
  @Render('s3-buckets')
  public async getAllBuckets() {
    const buckets = await this.s3Service.getBuckets()
    return { buckets }
  }

  @Get('/buckets/:bucket')
  @Render('s3-bucket')
  public async getBucket(@Param('bucket') bucket: string) {
    const objects = await this.s3Service.getBucketObjects(bucket)
    return { bucket, objects }
  }

  @Get('/buckets/:bucket/objects/:object')
  public async getObject(@Param('bucket') bucket: string, @Param('object') object, @Response() res) {
    const presignedUrl = await this.s3Service.getObjectPresign(bucket, object)
    return res.redirect(presignedUrl)
  }
}
