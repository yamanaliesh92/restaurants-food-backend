import { EmailSender } from '../abstract/email-abstract.service.interface';
import { EmailPayloadDto } from '../dto';
import { Template } from '../dto/email.base.dto';
import { renderTemplate } from '../utils/render';

export class SendGridService implements EmailSender {
  async send(dto: EmailPayloadDto) {
    const html = renderTemplate(dto);

    const options = {
      from: 'you@example.com',
      to: dto.to,
      subject: 'hello world',
      html,
    };
  }
}
