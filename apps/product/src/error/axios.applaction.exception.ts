import { ApplicationException } from './appliaction.exception';

export class AxiosApplicationException extends ApplicationException {
  constructor() {
    super('error in axios');
  }
}
