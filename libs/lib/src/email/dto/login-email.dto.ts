import { EmailBaseDto, Template } from './email.base.dto';

interface LoginTemplateData {
  firstName: string;
  verificationLink: string;
  expiresIn: string;
  to: string;
  subject: string;
}

export class LoginEmailTemplate extends EmailBaseDto {
  firstName: string;
  verificationLink: string;
  expiresIn: string;

  constructor(data: LoginTemplateData) {
    super(Template.LOGIN, data.to, data.subject);
    this.firstName = data.firstName;
    this.verificationLink = data.verificationLink;
    this.expiresIn = data.expiresIn;
  }
}
