// src/lambda.ts
// import '@interfaces'
// import '@services/api-service';
// import '@routers/api-controller';
// import '@routers/index-controller';
import serverless from 'serverless-http';
import app from './main';

// Wrap Koa app in Lambda handler function
export const handler = serverless(app);
