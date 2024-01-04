import { ApplicationException } from './application.exception';

export class NotFoundApplicationException extends ApplicationException {
  constructor() {
    super('the record we are looking for was not found');
  }
}
