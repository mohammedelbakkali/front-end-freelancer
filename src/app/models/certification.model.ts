import { User } from "./user.model";

export interface certification {
   certificate: string;
   from: string;
   year: Date;
   user : User
}