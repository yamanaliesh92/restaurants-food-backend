import { ApplicationException } from './application.exception';

export class UnKnowErrorApplicationException extends ApplicationException {
  constructor() {
    super('Unexpected error occoured');
  }
}
