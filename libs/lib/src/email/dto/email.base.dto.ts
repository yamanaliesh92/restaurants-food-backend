export enum Template {
  LOGIN = 'login',
  RESET_PASSWORD = 'reset_password',
}

export class EmailBaseDto {
  template: Template;
  to: string;
  subject: string;

  constructor(template: Template, to: string, subject: string) {
    this.template = template;
    this.to = to;
    this.subject = subject;
  }
}
