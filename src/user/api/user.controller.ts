import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

import { UserService } from '../application/user.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { CreateUserError } from '../domain/create-user-error';

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<any> {
        return this.userService.getUserById(id);
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
