import { UUID } from "crypto";
import { User } from "./User";

export interface InventoryItem {
    id: UUID;
    user: User;
    name: string;
    item_type: string;
    descrption: string;
    image_url?: string;
}