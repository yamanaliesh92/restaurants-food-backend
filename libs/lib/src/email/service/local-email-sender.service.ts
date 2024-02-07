import { EmailSender } from '../abstract/email-abstract.service.interface';
import { EmailPayloadDto } from '../dto';

export class LocalEmailSenderService implements EmailSender {
  async send(dto: EmailPayloadDto) {
    console.log({ dto });
  }
}
