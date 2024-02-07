export class UnknownTemplateException extends Error {
  constructor(template: unknown) {
    super(`Template ${template} is not known`);
  }
}
