import { ApplicationException } from './application.exception';

export class UserNotFoundApplicationException extends ApplicationException {
  constructor() {
    super('user not found');
  }
}
