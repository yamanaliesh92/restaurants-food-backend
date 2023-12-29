import { DataAccessException } from './data.access.exception';

export class UnKnowDataAccessException extends DataAccessException {
  constructor(cause?: unknown) {
    super(cause);
  }
}
