import { UUID } from "crypto";
import { User } from "./User";

export interface Follow {
    id: UUID;
    follow_info: User;
}