import User from "./user";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserError } from "./create-user-error";

export abstract class UserRepository {
    abstract getUserByEmail(id: string): Promise<User | undefined>

    abstract createUser(user: CreateUserDto): Promise<CreateUserError[] | void>
}