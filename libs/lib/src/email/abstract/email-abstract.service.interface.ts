import { EmailPayloadDto } from '../dto';

export abstract class EmailSender {
  public abstract send(dto: EmailPayloadDto): Promise<void>;
}
