import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @MessagePattern({ cmd: 'login' })
  async login(data: {
    email: string,
    password: string
  }) {
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'register' })
  async register(data: any) {
    return this.authService.signUp(data);
  }
}