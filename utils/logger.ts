import { configure, getLogger } from 'log4js';
import path from 'path';

// 检查是否在 Lambda 环境中运行
const isLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME;

let config;

if (isLambda) {
  // Lambda 环境中使用控制台日志
  config = {
    appenders: {
      console: { type: 'console' }
    },
    categories: {
      default: { appenders: ['console'], level: 'info' },
      system: { appenders: ['console'], level: 'error' },
      access: { appenders: ['console'], level: 'info' }
    }
  };
} else {
  // 非 Lambda 环境中使用文件日志
  const ROOT_PATH = path.resolve(__dirname, '..');
  const LOG_PATH = path.join(ROOT_PATH, 'logs');
  
  config = {
    appenders: {
      app: { 
        type: 'file', 
        filename: `${LOG_PATH}/app-error.log`,
        maxLogSize: 10485760,
        backups: 3
      },
      system: {
        type: 'file',
        filename: `${LOG_PATH}/system-error.log`,
        maxLogSize: 10485760,
        backups: 3
      },
      access: {
        type: 'dateFile',
        filename: `${LOG_PATH}/access.log`,
        pattern: '.yyyy-MM-dd',
        keepFileExt: true
      },
      console: { type: 'console' }
    },
    categories: {
      default: { appenders: ['app', 'console'], level: 'error' },
      system: { appenders: ['system', 'console'], level: 'error' },
      access: { appenders: ['access'], level: 'info' }
    }
  };
}

configure(config);

// 获取不同用途的logger
const appLogger = getLogger('default');
const systemLogger = getLogger('system');
const accessLogger = getLogger('access');

export { appLogger, systemLogger, accessLogger };
