import { ApplicationException } from './apllicationException';

export class UserNotFoundApplicationException extends ApplicationException {
  constructor() {
    super('user not found');
  }
}
