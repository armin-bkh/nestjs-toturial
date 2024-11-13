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
import * as argon2 from 'argon2';

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

  async login(userId: number) {
    const { accessToken, refreshToken } = await this.generateJwtToken(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: number) {
    const { accessToken, refreshToken } = await this.generateJwtToken(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async generateJwtToken(userId: number) {
    const signPayload: JwtSignPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(signPayload),
      this.jwtService.signAsync(signPayload, this.refreshJwtConfiguration),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(id: number, refreshToken: string) {
    const user = await this.userService.findById(id);
    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('invalid refresh token');

    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches)
      throw new UnauthorizedException('invalid refresh token');

    return {
      id,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findById(userId);
    return { id: user.id, role: user.role };
  }

  async signOut(userId: number) {
    return await this.userService.updateHashedRefreshToken(userId, null);
  }
}
