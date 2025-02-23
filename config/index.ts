import { join } from 'path';

let config: Record<string, any> = {
  viewDir: join(__dirname, '..', 'views'),
  staticDir: join(__dirname, '..', 'assets'),
  port: process.env.PORT || 8081,
  memoryFlag: false,
};
if (process.env.NODE_ENV === 'development') {
  const localConfig = {
    port: process.env.PORT || 8081,
  };
  config = { ...config, ...localConfig };
}
if (process.env.NODE_ENV === 'production') {
  const prodConfig = {
    port: process.env.PORT || 8082,
    memoryFlag: 'memory',
  };
  config = { ...config, ...prodConfig };
}

export default config;
