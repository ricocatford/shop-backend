import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { UserRepository } from "../domain/user-repository";
import { CreateUserDto } from "../domain/dto/create-user.dto";

@Injectable()
export class UserSqlRepository implements UserRepository {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    async getUserById(id: string): Promise<any> {
        return this.dataSource.query(`SELECT * from users WHERE id="${id}";`);
    }

    async createUser(user: CreateUserDto): Promise<void> {
        this.dataSource.query(`INSERT INTO users (id, name, password, email, join_date) VALUES("${user.id}", "${user.name}", "${user.password}", "${user.email}", NOW());`);
    }
}