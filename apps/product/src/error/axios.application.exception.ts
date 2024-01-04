import { ApplicationException } from './application.exception';

export class AxiosApplicationException extends ApplicationException {
  constructor() {
    super('error in axios');
  }
}
