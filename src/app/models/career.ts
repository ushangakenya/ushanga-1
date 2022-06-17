import { Timestamp } from "rxjs";

export interface Career {
    career_id: string;
    title: string;
    department?:string;
    time?:string;
    location?:string;
    description?: string; 
    uploaded?:Timestamp<any>;
  }