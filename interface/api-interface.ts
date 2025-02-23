export interface IApi<T = unknown> {
  getInfo(): Promise<T>;
}
