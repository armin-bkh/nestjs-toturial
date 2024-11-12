import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) {
    const { accessToken, refreshToken } = this.authService.generateJwtToken(
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
  refreshToken(@Req() req) {
    const { accessToken, refreshToken } = this.authService.regenerateJwtToken(
      req.user.id,
    );
    return {
      id: req.user.id,
      accessToken,
      refreshToken,
    };
  }
}
