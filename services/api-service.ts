import { IApi, IData } from '@interfaces/index';

class ApiService implements IApi<IData> {
  getInfo() {
    return new Promise<IData>((resolve) => {
      resolve({
        item: '我是后台数据🌺',
        result: [1, 'next'],
      });
    });
  }
}
export default ApiService;
