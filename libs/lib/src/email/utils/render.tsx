import { EmailPayloadDto } from '../dto';
import { Template } from '../dto/email.base.dto';
import { LoginComponent } from '../templates/login-template';
import React from 'react';
import { UnknownTemplateException } from '../errors/unknown-template.exception';
import { render } from '@react-email/render';

export function renderTemplate(dto: EmailPayloadDto) {
  switch (dto.template) {
    case Template.LOGIN:
      return render(<LoginComponent {...dto} />);

    default:
      throw new UnknownTemplateException(dto.template);
  }
}

// you want to send email
// login + data
// login -> html + data
// render -> html
// sendGrid -> html + send it
