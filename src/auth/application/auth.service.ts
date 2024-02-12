import { Injectable } from '@nestjs/common';

import { UserService } from 'src/user/application/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        console.log(user, password);
    }
}
