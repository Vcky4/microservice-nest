import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authService: ClientProxy
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.send({ cmd: 'login' }, loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.send({ cmd: 'register' }, registerDto);
    }
}
