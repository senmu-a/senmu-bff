import { GET, route } from 'awilix-koa';
import { IContext } from '@interfaces/koa-interface';

@route('/')
class IndexController {
  @GET()
  async actionList(ctx: IContext): Promise<void> {
    //react vue ...html字符串 diff
    // TODO: 修改兜底逻辑
    const staticAssetsUrl = process.env.STATIC_ASSETS_URL || `http://sam-app-static-assets.s3-website-${process.env.AWS_REGION || 'us-east-2'}.amazonaws.com`;
    console.log('🌺🌺🌺🌺🌺🌺🌺 ', staticAssetsUrl);
    const data = await ctx.render('index', {
      data: '服务端数据',
      staticAssetsUrl
    });
    console.log('🍊🍊🍊🍊🍊🍊🍊 ', data);

    ctx.body = data;
  }
}
export default IndexController;
