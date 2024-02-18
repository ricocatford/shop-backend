import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../application/auth.service';
import { UserModule } from 'src/user/api/user.module';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";

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
	providers: [AuthService]
})
export class AuthModule { }
