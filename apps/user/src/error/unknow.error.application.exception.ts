import { ApplicationException } from './apllicationException';

export class UnKnowErrorApplicationException extends ApplicationException {
  constructor() {
    super('unKnow Error happen');
  }
}
