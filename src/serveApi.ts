import awsServerlessExpress from 'aws-serverless-express';
import { createApiServer } from './server';

const serverPromise = createApiServer().then(expressApp =>
  awsServerlessExpress.createServer(expressApp as any, undefined, ['*/*']),
);

export const serveApi: AWSLambda.Handler = async (event, context) =>
  serverPromise.then(async server => {
    // tslint:disable-next-line promise-must-complete
    return new Promise(resolve => {
      // See https://github.com/awslabs/aws-serverless-express/issues/134
      // eslint-disable-next-line no-param-reassign
      context.succeed = resolve;

      awsServerlessExpress.proxy(server, event, context);
    });
  });
