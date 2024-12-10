// File: Post.ts
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the Post type object
import { UUID } from "crypto";
import { User } from "./User";

export interface Post {
    id: UUID;
    user: string;
    created_at: Date;
    user_info: User;
    image_url?: string;
    pattern?: number;
    caption?: string;
}