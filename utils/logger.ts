import { configure, getLogger } from 'log4js';
import path from 'path';

// 获取项目根目录路径
const ROOT_PATH = path.resolve(__dirname, '..');
const LOG_PATH = path.join(ROOT_PATH, 'logs');

configure({
  appenders: {
    // 应用错误日志
    app: { 
      type: 'file', 
      filename: `${LOG_PATH}/app-error.log`,
      maxLogSize: 10485760, // 10MB
      backups: 3
    },
    // 未捕获的系统错误日志
    system: {
      type: 'file',
      filename: `${LOG_PATH}/system-error.log`,
      maxLogSize: 10485760,
      backups: 3
    },
    // 访问日志
    access: {
      type: 'dateFile',
      filename: `${LOG_PATH}/access.log`,
      pattern: '.yyyy-MM-dd',
      keepFileExt: true
    },
    // 控制台输出
    console: {
      type: 'console'
    }
  },
  categories: {
    default: { 
      appenders: ['app', 'console'], 
      level: 'error' 
    },
    system: {
      appenders: ['system', 'console'],
      level: 'error'
    },
    access: {
      appenders: ['access'],
      level: 'info'
    }
  }
});

// 获取不同用途的logger
const appLogger = getLogger('default');
const systemLogger = getLogger('system');
const accessLogger = getLogger('access');

export { appLogger, systemLogger, accessLogger };
