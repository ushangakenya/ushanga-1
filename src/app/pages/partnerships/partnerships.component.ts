import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PartnershipFileUploadService } from 'src/app/services/partnership-file-upload.service';


@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.css']
})
export class PartnershipsComponent implements OnInit {
  fileUploads?: Array<any> = [];
  fileUpload!: FileUpload;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  
  form!: FormGroup;
  documents: Array<any> = [];
  industry: Array<any> = [];
  
  private basePath = '/partnership_uploads';
  constructor(private _router: Router, private storage: AngularFireStorage,private formBuilder: FormBuilder,private uploadService: PartnershipFileUploadService,public auth:AuthService,private notifyService : NotificationService) {
 
    this.form = new FormGroup({
      email: new FormControl('' , [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)] ),
      message: new FormControl('', [Validators.required, Validators.minLength(5)] ),
      uploaded: new FormControl(''),
      industry: new FormControl(''),
      documents: new FormControl('')
    });
  }

  ngOnInit() {
  }
  
  deleteFileUpload(fileUpload: FileUpload): void {
    const index: any = this.fileUploads?.indexOf(fileUpload);
    if (index !== -1) {
        this.fileUploads?.splice(index, 1);
    }  
    this.uploadService.deleteFile(fileUpload);
  }
  industryclick($event: { target: any; srcElement: any; }){
    
    let temp= $event.srcElement.parentNode;
    for(let i = 0; i < temp.childNodes.length; i++){
      
      if(temp.childNodes[i].nodeName === 'DIV'){
      if(temp.childNodes[i].classList.contains('active')){ 
        const index: number = this.industry.indexOf(temp.childNodes[i].id);
        if (index !== -1) {
          this.industry.splice(index, 1);
      }  

        temp.childNodes[i].classList.remove('active'); 
      }else{
        this.industry.push(temp.childNodes[i].id)
        $event.srcElement.classList.add('active') 
      }
    }
    }
  } 
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL; 
          fileUpload.name = fileUpload.file.name;
          this.uploadService.saveFileData(fileUpload).then(e=>{
            fileUpload.id = e
            this.fileUploads?.push(fileUpload)
            this.documents.push({id:fileUpload.id,url:fileUpload.url,name:fileUpload.name});
          });
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
      
  get f(){
    return this.form.controls;
  }
  
  submit(){

    this.form.patchValue({
      uploaded: this.auth.ts,
      documents: this.documents,
      industry:this.industry
    });

    if(this.industry.length < 1){

      this.form.controls['industry'].setErrors({'incorrect': true});

    }
    console.log('values',this.form.value)
    this.auth.createPartnership(this.form.value).then(()=>{

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['partnership']).then(()=>{ 
        this.notifyService.showSuccess("We will get back to you as soon as possible.", "Thank you!!")
    })
    })
  }


}
