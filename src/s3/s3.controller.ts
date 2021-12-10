import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PostObjectDTO } from './dto/post-object.dto'
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

  @Post('/buckets/objects/')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(
    @Query('bucket') bucket: string,
    @Body() body: PostObjectDTO,
    @Response() res,
    @UploadedFile() file: any,
  ) {
    await this.s3Service.upload(bucket, body.objectKey, file.buffer)
    return res.redirect('/s3/buckets/object/upload/success')
  }

  @Get('/buckets/object/upload/success')
  @Render('s3-object-upload-success')
  public async onPostObjectSuccess() {}
}
