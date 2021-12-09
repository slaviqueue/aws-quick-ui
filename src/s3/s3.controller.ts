import { Controller, Get, Param, Render, Response } from '@nestjs/common'
import { S3Service } from './s3.service'

@Controller('s3')
export class S3Controller {
  public constructor(private readonly s3Service: S3Service) {}

  @Get('/buckets')
  @Render('s3-buckets')
  public getAllBuckets() {
    return {
      buckets: this.s3Service.getBuckets(),
    }
  }

  @Get('/buckets/:bucket')
  @Render('s3-bucket')
  public getBucket(@Param('bucket') bucket: string) {
    return {
      bucket,
      objects: this.s3Service.getBucketObjects(bucket),
    }
  }

  @Get('/buckets/:bucket/objects/:object')
  public getObject(@Param('bucket') bucket: string, @Param('object') object, @Response() res) {
    const presignedUrl = this.s3Service.getObjectPresign(bucket, object)
    return res.redirect(presignedUrl)
  }
}
