export class ApplicationException extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
