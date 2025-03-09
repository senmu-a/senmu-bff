import { GET, route } from 'awilix-koa';
import type { IRouterContext } from 'koa-router';
import type { IApi } from '@interfaces/index';

@route('/api')
class ApiController {
  private apiService: IApi;
  constructor({ apiService }: { apiService: IApi }) {
    this.apiService = apiService;
  }
  @route('/list')
  @GET()
  async actionList(
    ctx: IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const data = await this.apiService.getInfo();
    ctx.body = {
      data,
    };
  }

  @route('/hello')
  @GET()
  actionHello(
    ctx: IRouterContext,
    next: () => Promise<any>
  ): void {
    ctx.body = 'hello world';
  }

}
export default ApiController;
