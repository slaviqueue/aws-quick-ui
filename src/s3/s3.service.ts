import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(private readonly config: ConfigService) {
    this.s3 = new S3({ 
      endpoint: this.config.get<string>('aws.endpoint'),
      region: this.config.get<string>('aws.region'),
      s3ForcePathStyle: true 
    });

  }

  public async getBuckets() {
    return this.s3
      .listBuckets()
      .promise()
      .then((res) => res.Buckets!)
  }

  public async getBucketObjects(bucket: string) {
    return this.s3
      .listObjects({ Bucket: bucket })
      .promise()
      .then((res) => res.Contents)
  }

  public getObjectPresign(bucket: string, object: string) {
    return this.s3.getSignedUrlPromise('getObject', { Bucket: bucket, Key: object })
  }

  public upload(bucket: string, objectKey: string, body: any) {
    return this.s3.upload({ Bucket: bucket, Body: body, Key: objectKey }).promise()
  }
}
