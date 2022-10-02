import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopnavComponent } from './shopnav/shopnav.component';
import { CartComponent } from '../shared/cart/cart.component';


@NgModule({
  declarations: [
    ShopComponent,
    ShopnavComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
