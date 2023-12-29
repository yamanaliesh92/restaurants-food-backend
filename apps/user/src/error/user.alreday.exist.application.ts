import { ApplicationException } from './apllicationException';

export class UserAlreadyExistApplicationException extends ApplicationException {
  constructor() {
    super('user already exist');
  }
}
