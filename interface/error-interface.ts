import type { Logger } from 'log4js';
export interface IErrorLogger {
  appLogger: Logger;
  systemLogger: Logger;
  accessLogger: Logger;
}
