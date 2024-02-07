import { LoginEmailTemplate } from './login-email.dto';
import { ResetPasswordTemplateDto } from './reset-password.dto';

export { ResetPasswordTemplateDto } from './reset-password.dto';
export { LoginEmailTemplate } from './login-email.dto';

export type EmailPayloadDto = LoginEmailTemplate | ResetPasswordTemplateDto;
