import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user.id,
    );
    return {
      id: req.user.id,
      accessToken,
      refreshToken,
    };
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      req.user.id,
    );
    return {
      id: req.user.id,
      accessToken,
      refreshToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signOut(@Req() req) {
    await this.authService.signOut(req.user.id);
  }
}
