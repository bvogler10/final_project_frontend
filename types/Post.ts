import { UUID } from "crypto";
import { User } from "./User";

export interface Post {
    id: UUID;
    user: string;
    created_at: Date;
    user_info: User;
    image?: string;
    pattern?: number;
    caption?: string;
}