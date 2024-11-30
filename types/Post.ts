import { UUID } from "crypto";

export interface Post {
    id: UUID;
    user: string;
    created_at: Date;
    image?: string;
    pattern?: number;
    caption?: string;
}