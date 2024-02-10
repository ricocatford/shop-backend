import { Injectable } from '@nestjs/common';

import User from '../domain/user';
import { UserRepository } from '../domain/user-repository';
import { CreateUserDto } from '../domain/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getUserById(id: string): Promise<User> {
        return this.userRepository.getUserById(id);
    }

    async createUser(user: CreateUserDto) {
        this.userRepository.createUser(user);
    }
}
