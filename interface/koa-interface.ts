import { Context } from 'koa';

// 直接定义 render 方法的类型
type RenderFunction = (
  view: string,
  options?: { [key: string]: any }
) => Promise<string>;

export interface IContext extends Context {
  render: RenderFunction;
}
