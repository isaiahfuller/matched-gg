import { Controller, Get, Logger, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
 constructor() {}

 @Get('steam')
 @UseGuards(AuthGuard('steam'))
 login() {}
}