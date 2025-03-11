import { GET, route } from 'awilix-koa';
import { IContext } from '@interfaces/koa-interface';

@route('/')
class IndexController {
  @GET()
  async actionList(ctx: IContext): Promise<void> {
    //react vue ...html字符串 diff
    const data = await ctx.render('index', {
      data: '服务端数据',
    });
    console.log('🍊🍊🍊🍊🍊🍊🍊 ', data);

    ctx.body = data;
  }
}
export default IndexController;
