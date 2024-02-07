import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SendGridService } from './service/send-grid.service';
import { LocalEmailSenderService } from './service/local-email-sender.service';
import { EmailSender } from './abstract/email-abstract.service.interface';

export const EmailSenderProvider = {
  provide: EmailSender,
  //   useFactory: (config: ConfigService) => {

  // // if(config.getOrThrow("send-grid"))
  // //     return new SendGridService();
  // //     } else {
  // //       return new LocalEmailSenderService();
  // //     }
  // //   },
  inject: [ConfigService],
};

@Module({
  // exports: [EmailSenderProvider],
  // providers: [EmailSenderProvider],
  imports: [],
})
export class EmailModule {}
