import awsServerlessExpress from 'aws-serverless-express';
import { Context, Handler } from 'aws-lambda';
import app from './app';

const server = awsServerlessExpress.createServer(app);

export const handler: Handler = (event: any, context: Context) => {
  awsServerlessExpress.proxy(server, event, context);
};
