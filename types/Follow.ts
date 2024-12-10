// File: Follow.ts
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the Follow type object

import { UUID } from "crypto";
import { User } from "./User";

export interface Follow {
    id: UUID;
    follow_info: User;
}