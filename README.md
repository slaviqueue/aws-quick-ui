# AWS Quick UI

A simple UI for SQS and S3 spinned locally

## How to run

1. Clone a repo via `git clone`
2. Run `npm install`
3. Run `npm start`

# Run via Docker compose

1. Run `docker compose up -d`
2. View logs (optional) `docker compose logs -f`
3. Stop `docker compose down`

# Run localstack

Run localstack container if not already running

1. Change environment varialbe `AWS_ENDPOINT=http://host.docker.internal:4566`
2. Run `docker compose -f local.yml up -d`
3. View logs (optional) `docker compose -f local.yml logs -f`

## Examples

Use following commands to create resouces inside localstack using aws cli

Create S3 Bucket

`aws s3api create-bucket --bucket sample-bucket --endpoint http://localhost:4566 --region us-east-1`

Create SQS Queue

`aws sqs create-queue --queue-name sample-queue --endpoint http://localhost:4566 --region us-east-1`

Create SNS Topic

`aws sns create-topic --name sample-topic --endpoint http://localhost:4566 --region us-east-1`

### References
- https://docs.localstack.cloud/user-guide/aws/s3/
- https://docs.localstack.cloud/user-guide/aws/sns/
- https://docs.localstack.cloud/user-guide/aws/sqs/