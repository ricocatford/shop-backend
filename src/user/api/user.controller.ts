import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { UserService } from '../application/user.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { CreateUserError } from '../domain/create-user-error';
import User from '../domain/user';

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUserByEmail(@Body() email: string): Promise<User | undefined> {
        return this.userService.getUserByEmail(email);
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<void> {
        const result: CreateUserError[] | any = await this.userService.createUser(user);

        if (result.includes(CreateUserError.EmailAlreadyInUse) && result.includes(CreateUserError.NameAlreadyInUse)) {
            throw new HttpException("Name and Email already in use, please choose another one.", HttpStatus.CONFLICT);
        }

        if (result.includes(CreateUserError.EmailAlreadyInUse)) {
            throw new HttpException("Email already in use, please choose another one.", HttpStatus.CONFLICT);
        }

        if (result.includes(CreateUserError.NameAlreadyInUse)) {
            throw new HttpException("Name already in use, please choose another one.", HttpStatus.CONFLICT);
        }
    }
}
