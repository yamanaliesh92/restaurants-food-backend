import { ApplicationException } from './application.exception';

export class AxiosErrorApplicationException extends ApplicationException {
  constructor() {
    super('error in axios');
  }
}
