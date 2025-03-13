import Koa from 'koa';
import type { IContext } from '@interfaces/koa-interface';
import type { IErrorLogger } from '@interfaces/error-interface';

class ErrorHandler {
  static error(app: Koa, { appLogger, systemLogger, accessLogger }: IErrorLogger) {
    // 访问日志中间件
    app.use(async (ctx: IContext, next: () => Promise<unknown>) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      accessLogger.info({
        method: ctx.method,
        url: ctx.url,
        status: ctx.status,
        duration: `${ms}ms`
      });
    });

    // 全局错误处理中间件
    app.use(async (ctx: IContext, next: () => Promise<unknown>) => {
      try {
        await next();
      } catch (err) {
        console.log('hello')
        const error = err as Error;
        // 使用应用错误日志记录器
        appLogger.error({
          message: error.message,
          stack: error.stack,
          url: ctx.url,
          method: ctx.method,
          headers: ctx.headers,
        });
      }
    });

    // 处理未捕获的异常
    process.on('uncaughtException', (error) => {
      // 使用系统错误日志记录器
      systemLogger.error('Uncaught Exception:', {
        message: error.message,
        stack: error.stack,
      });
    });

    process.on('unhandledRejection', (reason, promise) => {
      systemLogger.error('Unhandled Rejection:', {
        reason,
        promise,
      });
    });
  }
}
export default ErrorHandler;
