import { ApplicationException } from './appliaction.exception';

export class NotFoundApplicationException extends ApplicationException {
  constructor() {
    super('order not found');
  }
}
