import { Post, Body, Controller, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';

import { AuthService } from '../application/auth.service';
import { SignInDto } from '../domain/dto/sign-in.dto';
import { Public } from '../infrastructure/public.decorator';

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @Public()
    @Get("profile")
    getProfile(@Request() req: any) {
        return req.user;
    }
}
