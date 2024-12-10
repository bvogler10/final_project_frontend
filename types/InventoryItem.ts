// File: InventoryItem.ts
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the InventoryItem type object

import { UUID } from "crypto";
import { User } from "./User";

export interface InventoryItem {
    id: UUID;
    user_info: User;
    name: string;
    item_type: string;
    description: string;
    image_url?: string;
}