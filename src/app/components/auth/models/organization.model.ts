import { User } from "./user.model";

export interface Organization extends User {
    company: string
}