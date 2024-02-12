import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "../application/user.service";
import { UserRepository } from "../domain/user.repository";
import { UserSqlRepository } from "../infrastructure/user.sql.repository";

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        { provide: UserRepository, useClass: UserSqlRepository }
    ],
    exports: [UserService],

})
export class UserModule { }