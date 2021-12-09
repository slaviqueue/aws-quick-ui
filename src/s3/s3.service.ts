import { Injectable } from '@nestjs/common'
import { isEmpty } from 'lodash'
import { execAwsCli } from 'src/utils/execAwsCli'

@Injectable()
export class S3Service {
  private static LOCALSTACK_S3_PORT = 4572

  public getBuckets(): string[] {
    const output = execAwsCli('s3api list-buckets --query "Buckets[].Name"', S3Service.LOCALSTACK_S3_PORT).toString()
    const buckets = JSON.parse(output) as any

    return buckets
  }

  public getBucketObjects(bucket: string): string[] {
    const output = execAwsCli(
      `s3api list-objects --query="Contents[].Key" --bucket ${bucket}`,
      S3Service.LOCALSTACK_S3_PORT,
    )
      .toString()
      .trim()

    const objects = JSON.parse(output)

    return objects
  }

  public getObjectPresign(bucketName: string, objectName: string): string {
    const output = execAwsCli(`s3 presign "${bucketName}/${objectName}"`, S3Service.LOCALSTACK_S3_PORT)
      .toString()
      .trim()

    if (isEmpty(output)) {
      throw new Error('something went wrong wile presigning object')
    }

    return output
  }
}
