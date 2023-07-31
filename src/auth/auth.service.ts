import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsInput } from './inputs/auth-credentials.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    }

    return null;
  }

  async login(credentials: AuthCredentialsInput) {
    const user = await this.userService.findOne({ email: credentials.email });
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }
}
