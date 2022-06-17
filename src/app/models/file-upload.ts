import { Timestamp } from "rxjs";

export class FileUpload {
  id!: string;
    key!: string;
    name!: string;
    url!: string;
    uploaded?:any;
    file: File;
    constructor(file: File) {
      this.file = file;
    }
  }