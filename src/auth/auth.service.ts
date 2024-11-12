import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtSignPayload } from './types/jwt.type';
import { ConfigType } from '@nestjs/config';
import refreshJwtConfig from '../config/refresh-jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('user not found!');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('password is incorrect');
    return { id: user.id };
  }

  generateJwtToken(userId: number) {
    const signPayload: JwtSignPayload = { sub: userId };
    const accessToken = this.jwtService.sign(signPayload);
    const refreshToken = this.jwtService.sign(
      signPayload,
      this.refreshJwtConfiguration,
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  regenerateJwtToken(userId: number) {
    const signPayload: JwtSignPayload = { sub: userId };
    const accessToken = this.jwtService.sign(signPayload);
    const refreshToken = this.jwtService.sign(
      signPayload,
      this.refreshJwtConfiguration,
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
