import { IApi } from '@interfaces/api-interface';
import { IData } from '@interfaces/data-interface';

class ApiService implements IApi<IData> {
  getInfo() {
    return new Promise<IData>((resolve) => {
      resolve({
        item: '我是后台数据🌺',
        result: [1, 'next'],
        staticAssetsUrl: process.env.STATIC_ASSETS_URL || 'No Set'
      });
    });
  }
}
export default ApiService;
