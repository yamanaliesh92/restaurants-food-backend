import { ApplicationException } from './application.exception';

export class UnKnowApplicationException extends ApplicationException {
  constructor() {
    super('Unexpected error occurred');
  }
}
