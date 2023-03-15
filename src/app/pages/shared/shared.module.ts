import { PhonePipe } from './../../pipes/phone.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgAisModule } from 'angular-instantsearch';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './cart/cart.component';  
import { QRCodeModule } from 'angular2-qrcode'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NavComponent,
    CartComponent ,
    PhonePipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ToastrModule.forRoot(), 
    NgAisModule.forRoot(),
    QRCodeModule,
    HttpClientModule
  ],
  exports:[NavComponent,CartComponent,NgAisModule,ToastrModule,QRCodeModule,HttpClientModule,PhonePipe]
})
export class SharedModule { }
