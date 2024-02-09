import User from "./user";
import { CreateUserDto } from "./dto/create-user.dto";

export abstract class UserRepository {
    abstract getUserById(id: string): Promise<User>

    abstract createUser(user: CreateUserDto): void
}