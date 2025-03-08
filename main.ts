import { addAliases } from 'module-alias';
// 注册模块映射表
addAliases({
  '@root': __dirname,
  '@config': `${__dirname}/config`,
  '@interfaces': `${__dirname}/interface`,
  '@middlewares': `${__dirname}/middlewares`,
  '@utils': `${__dirname}/utils`,
});

import Koa from 'koa';

import render from 'koa-swig';
import serve from 'koa-static';
import co from 'co';

// 日志系统
import * as logger from '@utils/logger';

import { createContainer, Lifetime } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';

import config from '@config/index';

import ErrorHandler from '@middlewares/error-handler';

const { port, viewDir, memoryFlag, staticDir } = config;

const app = new Koa();

// 将渲染函数包装在 co.wrap 中，以便在 Koa 中使用异步函数
app.context.render = co.wrap(
  render({
    // 设置视图文件的根目录
    root: viewDir,
    // 启用自动转义，以防止 XSS 攻击
    autoescape: true,
    // 设置缓存方式，本地不缓存，线上缓存
    cache: <'memory' | false>memoryFlag,
    // 不直接写入响应体
    writeBody: false,
    // 设置视图文件的扩展名为 'html'
    ext: 'html',
  })
);
//静态资源生效节点
app.use(serve(staticDir));

// 创建IOC容器
const container = createContainer();

// 加载模块，将所有可以被注入的代码都在container中（DI）
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase', // 将文件名转换为驼峰命名
  resolverOptions: {
    lifetime: Lifetime.SCOPED, // 每次请求都会创建一个新的实例
  },
});

// 生成middleware，添加进Koa的middleware中，便于每个controller请求时都能从容器中取到注入的服务
// 参考 routers/api-controller.ts 文件
app.use(scopePerRequest(container));

// 错误处理句柄
ErrorHandler.error(app, logger);

// 注册所有路由
app.use(loadControllers(`${__dirname}/routers/*.ts`));
if (process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    console.log(`🌼🌼🌼Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
}
export default app;
