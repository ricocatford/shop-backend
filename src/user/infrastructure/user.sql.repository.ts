import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";

import { UserRepository } from "../domain/user-repository";
import { CreateUserDto } from "../domain/dto/create-user.dto";
import User from "../domain/user";


@Injectable()
export class UserSqlRepository implements UserRepository {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    async getUserById(id: string): Promise<any> {
        return this.dataSource.query(`SELECT * from users WHERE id="${id}";`);
    }

    async createUser(user: CreateUserDto) {
        const encryptedPassword: string = await bcrypt.hash(user.password, 10);
        const findExistingNameOrEmail: User[] = await this.dataSource.query(`SELECT * from users WHERE name="${user.name}" OR email="${user.email}"`);

        if (findExistingNameOrEmail.length === 0) {
            this.dataSource.query(`INSERT INTO users (id, name, password, email, join_date) VALUES("${user.id}", "${user.name}", "${encryptedPassword}", "${user.email}", NOW());`);
        } else if (findExistingNameOrEmail.length > 0) {
            console.log("Error!")
        }

    }
}