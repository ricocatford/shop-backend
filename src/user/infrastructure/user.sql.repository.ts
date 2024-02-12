import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";

import { UserRepository } from "../domain/user.repository";
import { CreateUserDto } from "../domain/dto/create-user.dto";
import User from "../domain/user";
import { CreateUserError } from "../domain/create-user-error";


@Injectable()
export class UserSqlRepository implements UserRepository {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    async getUserByEmail(email: string): Promise<User | undefined> {
        const query = this.dataSource.query(`SELECT * from users WHERE email="${email}";`);
        return query;
    }

    async createUser(user: CreateUserDto): Promise<CreateUserError[] | void> {
        const encryptedPassword: string = await bcrypt.hash(user.password, 10);
        const findExistingEmail: User[] = await this.dataSource.query(`SELECT email from users WHERE email="${user.email}";`);
        const findExistingName: User[] = await this.dataSource.query(`SELECT name from users WHERE name="${user.name}";`);
        const errors = [];

        if (findExistingEmail.length > 0) {
            errors.push(CreateUserError.EmailAlreadyInUse);
        }

        if (findExistingName.length > 0) {
            errors.push(CreateUserError.NameAlreadyInUse);
        }

        if (errors.length > 0) {
            return errors;
        }

        this.dataSource.query(`INSERT INTO users (id, name, password, email, join_date) VALUES("${user.id}", "${user.name}", "${encryptedPassword}", "${user.email}", NOW());`);
    }
}