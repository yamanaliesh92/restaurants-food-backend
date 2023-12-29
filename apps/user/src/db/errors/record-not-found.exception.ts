import { DataAccessException } from './data-access.exception';

export class RecordNotFoundDataAccessException extends DataAccessException {
  constructor(err: unknown) {
    super(err);
  }
}
