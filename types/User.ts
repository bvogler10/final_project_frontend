import { UUID } from "crypto"


export interface User {
    id: UUID;
    email: string;
    name: string;
    username: string;
    is_staff: boolean;
    is_active: boolean;
    is_superuser: boolean;
    date_joined: Date;
    last_login: Date;
    bio?: string;
    link?: string;
    avatar?: string;
}