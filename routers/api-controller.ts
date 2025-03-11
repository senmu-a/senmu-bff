import { GET, route } from 'awilix-koa';
import type { IRouterContext } from 'koa-router';
import type { IApi } from '@interfaces/api-interface';

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
}
export default ApiController;
