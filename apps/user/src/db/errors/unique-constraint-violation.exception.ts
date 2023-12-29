import { DataAccessException } from './data-access.exception';

export class UniqueConstraintViolationDataAccessException extends DataAccessException {
  constructor(cause?: unknown) {
    super(cause);
  }
}
