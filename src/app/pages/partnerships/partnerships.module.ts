import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnershipsRoutingModule } from './partnerships-routing.module';
import { PartnershipsComponent } from './partnerships.component';


@NgModule({
  declarations: [
    PartnershipsComponent
  ],
  imports: [
    CommonModule,
    PartnershipsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PartnershipsModule { }
