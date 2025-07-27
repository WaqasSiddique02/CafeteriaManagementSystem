import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  requestOtp(@Body('email') email: string) {
    return this.otpService.requestOtp(email);
  }

  @Post('verify')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        otp: { type: 'string', example: '123456' },
      },
      required: ['email', 'otp'],
    },
  })
  verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return this.otpService.verifyOtp(email, otp);
  }
}
