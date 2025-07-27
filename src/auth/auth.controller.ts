import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateAuthDto, CreateSignUpDto, ResetPasswordDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ description: 'Login successful' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Post('login')
  @ApiBody({ type: CreateAuthDto })
  signIn(@Body() body: CreateAuthDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @ApiOkResponse({ description: 'User Signed up successfully' })
  @Post('signup')
  @ApiBody({ type: CreateSignUpDto })
  signUp(@Body() body: CreateSignUpDto) {
    return this.authService.signUp(body);
  }

  @Patch('reset-password/:email')
  updatePassword(
    @Param('email') email: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    console.log(`Received password reset request for email: ${email}`);
    return this.authService.updatePassword(email, resetPasswordDto);
  }
}
