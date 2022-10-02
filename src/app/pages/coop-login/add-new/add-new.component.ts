import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
 

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  product: any;
  submitted = false;
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,public auth:AuthService) { }

  ngOnInit() {
    
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        cooperativeID: ['', Validators.required],
        price: ['', Validators.required],
        status: ['', Validators.required],
        county: ['', Validators.required],
        constituency: ['', Validators.required],
        owner: ['', Validators.required],
        uploadDate: ['', Validators.required]
      } 
    );
  }
  
  get f(): { [key: string]: AbstractControl } {
    console.log('F pass')
    return this.form.controls;
  }

  newProduct(): void {
    this.submitted = false; 
  }
  
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  createProduct(){
    // this.auth.createProduct(q).then(() => {
    //   console.log('Created new item successfully!');
    //   this.submitted = true;
    // });
  }

}
