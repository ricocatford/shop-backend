import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";

import { AuthController } from './auth.controller';
import { AuthService } from '../application/auth.service';
import { UserModule } from 'src/user/api/user.module';
import { RolesGuard } from '../application/roles.guard';
import { AuthGuard } from '../application/auth.guard';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: "180s" }
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	]
})
export class AuthModule { }
