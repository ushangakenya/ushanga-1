import { Timestamp } from "rxjs";

export interface Blog {
    blog_id: string;
    title: string;
    description?: string; 
    uploaded?:Timestamp<any>;
  }