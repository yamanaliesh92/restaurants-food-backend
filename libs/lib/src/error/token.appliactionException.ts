import { ApplicationException } from './applicationException';

export class TokenISValidApplicationException extends ApplicationException {
  constructor() {
    super('token is valid');
  }
}
