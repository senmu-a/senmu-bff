// src/lambda.ts
import '@services/api-service';
import '@routers/api-controller';
import '@routers/index-controller';
import serverless from 'serverless-http';
import app from './main';

// 添加调试信息
console.log('Lambda environment:', {
  NODE_VERSION: process.version,
  PWD: process.env.PWD,
  LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT,
  __dirname: __dirname
});

// Wrap Koa app in Lambda handler function
export const handler = serverless(app);
