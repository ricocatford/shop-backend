import { Role } from "../../auth/domain/role";

export default interface User {
    id: string,
    name: string,
    password: string,
    email: string,
    joinDate: Date,
    role: Role
}