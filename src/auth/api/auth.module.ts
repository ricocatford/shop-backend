import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../application/auth.service';
import { UserModule } from 'src/user/api/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
