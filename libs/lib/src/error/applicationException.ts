export class ApplicationException extends Error {
  constructor(public message: string, public cause?: unknown) {
    super(message);
  }
}
