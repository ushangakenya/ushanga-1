import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-coop-login',
  templateUrl: './coop-login.component.html',
  styleUrls: ['./coop-login.component.css']
})
export class CoopLoginComponent implements OnInit {

  product: any;
  submitted = false;
  submittedEdit = false;
  form!: FormGroup;
  formEdit!: FormGroup;
  imageURL:any = '';
  selectedFile!: File;
  fb!: any;
  downloadURL!: Observable<string>;
  cooperativeMembers:any;
  products:any;
  uploadProgress$: Observable<number> | any ;
  editImg:any = '';

  constructor( private afs: AngularFirestore,private storage: AngularFireStorage,private formBuilder: FormBuilder,public auth:AuthService) {
    this.auth.getAllCooperativeMembers().subscribe((e:any) => {
      //Map the data to a more useable array
      this.cooperativeMembers = e 
       
    })

    this.auth.getAllProducts().subscribe((e: any)=>{
      e.forEach((q:any) => {  

        this.afs.doc(`cooperative_members/${q.owner}`).valueChanges().subscribe((e: any)=>{
          if(e.name != ''){
            q.owner = e.name
          }else{
            q.owner = e.number            
          }
        })

      }); 
      this.products = e
    })
    
  }

  ngOnInit() {
    
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        cooperativeID: [''],
        price: ['', Validators.required],
        status: [''],
        county: [''],
        location: ['', Validators.required],
        owner: ['', Validators.required],
        uploadDate: [''],
        imageURL: [''],
        id: ['']
      } 
    );

    this.formEdit = this.formBuilder.group(
      {
        name: ['', Validators.required],
        cooperativeID: [''],
        price: ['', Validators.required],
        status: [''],
        county: [''],
        location: ['', Validators.required],
        owner: ['', Validators.required],
        uploadDate: [''],
        imageURL: ['']
      } 
    );
 
  }

  getEditIMG(formImg:any){
    if(this.imageURL.trim().length == 0){ 
      this.editImg = formImg
      return formImg
    }else{
      this.editImg = this.imageURL
      return this.imageURL
    }
  }

  setValues(form:any){ 
    
    this.submitted = false

    this.formEdit = this.formBuilder.group(
      {
        id:[form.id],
        name: [form.name, Validators.required],
        cooperativeID: [''],
        price: [form.price, Validators.required],
        status: [''],
        county: [''],
        location: [form.location, Validators.required],
        owner: ['', Validators.required],
        uploadDate: [''],
        imageURL: [this.getEditIMG(form.imageURL)]
      } 
    );  
    
    this.formEdit.markAllAsTouched()
    

  }
  
  get f(): { [key: string]: AbstractControl } { 
    return this.form.controls;
  }

  newProduct(): void {
    this.onReset()
  }

  getOwner(id: any){
    // console.log('owner id',id)
  }

  onSubmitEdit(): void { 

    let today = new Date()
    this.submittedEdit = true;
    
    console.log('------------------------------------- 1' +  this.formEdit.errors);
    this.formEdit.patchValue({cooperativeID:this.auth.userID ,status:0, county:'Kajiado',uploadDate:today, imageURL:this.editImg})
    if (this.formEdit.invalid) { 
      return;
    }
    console.log('-------------------------------------' + this.formEdit.value);
    this.auth.updateProduct(this.formEdit.value).then(() => {
      console.log('Created new item successfully!');
      this.submittedEdit = true;
    }); 
  }
  
  onSubmit(): void { 
    
    let today = new Date()
    this.submitted = true;
    
    console.log('------------------------------------- 1' +  this.form.getError);
    this.form.patchValue({cooperativeID:this.auth.userID ,status:0, county:'Kajiado',uploadDate:today, imageURL:this.imageURL})
    if (this.form.invalid) { 
      return;
    }
    console.log('-------------------------------------' + this.form.value);
    this.auth.createProduct(this.form.value).then(() => {
      console.log('Created new item successfully!' );
      this.submitted = true;
    });
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `productImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`productImages/${n}`, file);
    this.uploadProgress$ = task.percentageChanges()
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
          this.imageURL = url.ref.getDownloadURL().then(e=>{
            console.log('inner url ' + e )
            this.imageURL = e
            this.editImg = e
            this.auth.imageURLS(e).then(f=>{
              console.log('Image successfully recorded')
            })
          })          
        }
      });
  }
}
