import { User } from "./user.model";

export interface education {
   country: string;
   college: string;
   title: string;
   major: string;
   year: Date;
   user : User
}