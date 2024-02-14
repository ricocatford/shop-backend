import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

import { UserService } from 'src/user/application/user.service';
import User from 'src/user/domain/user';
import { AccessToken } from '../domain/access-token';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) { }

    async signIn(email: string, password: string): Promise<AccessToken | undefined> {
        const user: User | undefined = await this.userService.getUserByEmail(email);

        if (user === undefined) {
            throw new UnauthorizedException("Email doesn't exist.");
        }

        const passwordIsMatch: boolean = await bcrypt.compare(password, user.password);

        if (!passwordIsMatch) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.id,
            username: user.name,
            role: user.role,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload)
        };

    }
}
