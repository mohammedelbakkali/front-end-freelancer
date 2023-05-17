import { certification } from "./certification.model";
import { education } from "./education.model";
import { language } from "./language.model";
import { skill } from "./skill.model";

export interface User {
    fullname: string;
    username: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    password :string;  
    description?: string;
    languages?: language[];
    skills?: skill[];
    education?: education[];
    certifications?: certification[];
    
  }
  
  