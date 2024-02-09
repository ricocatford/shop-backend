import { Roles } from "./roles";

export default interface User {
    id: string,
    name: string,
    password: string,
    email: string,
    joinDate: Date,
    role: Roles
}