import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //sign up
  async signUp(data: any) {
    return this.usersService.createUser(data)
  }

  async login(data: {
    email: string,
    password: string
  }) {
    const user = await this.usersService.findByEmail(data.email)
    const payload = { email: user.email, sub: user.id };

    //todo: compare password


    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }
}
