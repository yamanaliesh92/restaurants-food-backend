import { EmailBaseDto, Template } from './email.base.dto';

interface ResetPasswordTemplateData {
  firstName: string;
  verificationLink: string;
  expiresIn: string;
  requestedAt: Date;
  to: string;
  subject: string;
}

export class ResetPasswordTemplateDto extends EmailBaseDto {
  firstName: string;
  verificationLink: string;
  expiresIn: string;
  requestedAt: Date;

  constructor(data: ResetPasswordTemplateData) {
    super(Template.RESET_PASSWORD, data.to, data.subject);
    this.firstName = data.firstName;
    this.verificationLink = data.verificationLink;
    this.expiresIn = data.expiresIn;
    this.requestedAt = data.requestedAt;
  }
}
