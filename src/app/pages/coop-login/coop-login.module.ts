import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { CoopLoginRoutingModule } from './coop-login-routing.module';
import { CoopLoginComponent } from './coop-login.component';
import { AddNewComponent } from './add-new/add-new.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoopLoginComponent,
    AddNewComponent
  ],
  imports: [
    CommonModule,
    CoopLoginRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CoopLoginModule { }
