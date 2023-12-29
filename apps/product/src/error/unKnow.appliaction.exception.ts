import { ApplicationException } from './appliaction.exception';

export class UnKnowApplicationException extends ApplicationException {
  constructor() {
    super('unKnow Error happen');
  }
}
