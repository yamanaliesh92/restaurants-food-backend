import { DataAccessException } from './data-access.exception';

export class UnexpectedDataAccessException extends DataAccessException {
  constructor(cause?: unknown) {
    super(cause);
  }
}
