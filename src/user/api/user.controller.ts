import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { UserService } from '../application/user.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<any> {
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }
}
