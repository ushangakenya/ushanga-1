import { Timestamp } from "rxjs";

export interface Partnership {
    partnership_id: string;
    name: string;
    email?:string;
    message?:string;
    documents?:any;
    industry?: any; 
    uploaded?:Timestamp<any>;
  }