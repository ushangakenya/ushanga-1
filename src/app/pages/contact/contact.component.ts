import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form!: FormGroup;
  constructor(private _router: Router,private formBuilder: FormBuilder,public auth:AuthService,private notifyService : NotificationService) { 
    this.form = new FormGroup({
      name: new FormControl('', Validators.required) ,
      email: new FormControl('', [Validators.required,Validators.email]) ,
      message: new FormControl('',Validators.required) ,
      uploaded: new FormControl('',) 
    });
  }

  ngOnInit(): void {
  }
  get f(){
    return this.form.controls;
  }
  
  submit(){
    this.form.patchValue({
      uploaded: this.auth.ts
    });
    this.auth.createMessages(this.form.value).then(()=>{

      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['/contact']).then(()=>{ 
        this.notifyService.showInfo("Your message has been received.", "Thank you!!")
    })
    })
  }
  

}
