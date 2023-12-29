import { ApplicationException } from './apllicationException';

export class AxiosErrorApplicationException extends ApplicationException {
  constructor() {
    super('error in axios');
  }
}
