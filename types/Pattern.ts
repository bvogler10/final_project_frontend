import { UUID } from "crypto";
import { User } from "./User";

export interface InventoryItem {
    id: UUID;
    creator: User;
    name: string;
    difficulty: string;
    description: string;
    image_url?: string;
}