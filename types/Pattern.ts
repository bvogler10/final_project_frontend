// File: Pattern.ts
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the Pattern type object

import { UUID } from "crypto";
import { User } from "./User";

export interface Pattern {
    id: UUID;
    creator: User;
    name: string;
    difficulty: string;
    description: string;
    image_url: string;
    created_at: Date;
    creator_info: User;
}