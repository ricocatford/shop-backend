import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

import { UserService } from 'src/user/application/user.service';
import User from 'src/user/domain/user';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) { }

    async signIn(email: string, password: string): Promise<{ access_token: string } | undefined> {
        const user: User | undefined = await this.userService.getUserByEmail(email);

        if (user != undefined) {
            const passwordIsMatch: boolean = await bcrypt.compare(password, user.password);

            if (passwordIsMatch) {
                const { password, ...result } = user;
                const payload = {
                    sub: result.id,
                    username: result.name
                };

                return {
                    access_token: await this.jwtService.signAsync(payload)
                };
            }

            throw new UnauthorizedException();
        }
    }
}
