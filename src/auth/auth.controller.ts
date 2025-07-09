import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';

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
}
