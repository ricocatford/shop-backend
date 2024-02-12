import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";

import { UserService } from 'src/user/application/user.service';
import User from 'src/user/domain/user';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user: User | undefined = await this.userService.getUserByEmail(email);

        if (user != undefined) {
            const passwordIsMatch: boolean = await bcrypt.compare(pass, user.password)

            if (passwordIsMatch) {
                const { password, ...result } = user;
                return result;
            }
            
            throw new UnauthorizedException();
        }
    }
}
