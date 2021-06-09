import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'lambda-sqs-demo',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    producer: {
      handler: 'src/functions/producer/handler.default',
      events: [{
        http: {
          method: 'post',
          path: '/produce',

        }
      }]
    },
    consumer: {
      handler: 'src/functions/consumer/handler.default',
      events: [{
        sqs: {
          arn: 'arn:aws:sqs:eu-central-1:258148218765:dead-letter-Q.fifo',
        }
      }]
    }
  }
};

module.exports = serverlessConfiguration;
