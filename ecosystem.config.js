// pm2.config.js
const path = require('path');

const rootPath = process.cwd();
const logsPath = path.join(rootPath, 'logs');
module.exports = {
  apps: [
    {
      name: 'senmu-app',
      script: './main.ts',
      instances: 1,
      exec_mode: 'cluster',
      interpreter: './node_modules/.bin/ts-node', // 使用本地 ts-node
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
        TS_NODE_PROJECT: './tsconfig.json',
        PORT: 8081
      },
      env_production: {
        NODE_ENV: 'production',
        TS_NODE_PROJECT: './tsconfig.json',
        PORT: 8082
      },
      error_file: path.join(logsPath, 'senmu-app-error.log'),
      out_file: path.join(logsPath, 'senmu-app-out.log'),
      log_file: path.join(logsPath, 'senmu-app-combined.log'),
      max_size: '10M',
      max_files: '7d',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
