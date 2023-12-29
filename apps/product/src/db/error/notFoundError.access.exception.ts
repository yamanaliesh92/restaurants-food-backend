import { DataAccessException } from './data.access.exception';

export class NotFoundDataAccessException extends DataAccessException {
  constructor(err: unknown) {
    super(err);
  }
}
