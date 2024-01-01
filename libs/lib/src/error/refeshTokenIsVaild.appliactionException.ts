import { ApplicationException } from './applicationException';

export class RefreshTokenISValidApplicationException extends ApplicationException {
  constructor() {
    super('refresh token is valid');
  }
}
