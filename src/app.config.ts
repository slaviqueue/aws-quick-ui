
export default () => ({
    port: Number(process.env.APP_PORT) || 3000,
    aws: {
      endpoint: process.env.AWS_ENDPOINT,
      region: process.env.AWS_REGION,
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      accessSecret: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  