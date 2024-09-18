import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RpcException } from '@nestjs/microservices';

const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const valid = await this.comparePassword(pass, user.password)
    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //sign up
  async signUp(data: any) {
    const hashedPassword = await this.hashPassword(data.password);
    return this.usersService.createUser({
      ...data,
      password: hashedPassword
    }).then((data)=>{
      return {
        ...data,
        password: undefined
      }
    })
  }

  async login(data: {
    email: string,
    password: string
  }) {
    try {
      const user = await this.usersService.findByEmail(data.email)
      const payload = { email: user.email, sub: user.id };

      //compare password
      const validpassword = await this.comparePassword(data.password, user.password)
      if (user && validpassword) {
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            ...user,
            password: undefined
          }
        };
      }
      throw new RpcException('Invalid credentials');
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async hashPassword(password: string) {
    const result = await bcrypt.hash(password, 12);
    return result;
  }

  async comparePassword(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash);
    return result;
  }
}
