import { Controller, Post, UseGuards, Req, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth/refresh-jwt-auth.guard';
import { PublicRoute } from './decorators/publicRoute.decorator';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
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

  @PublicRoute()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() {}

  @PublicRoute()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user.id,
    );

    res.redirect(
      `http://localhost:8080?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );

    // return {
    //   id: req.user.id,
    //   accessToken,
    //   refreshToken,
    // };
  }

  @Post('signout')
  async signOut(@Req() req) {
    await this.authService.signOut(req.user.id);
  }
}
