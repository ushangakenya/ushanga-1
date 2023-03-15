import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopnavComponent } from './shopnav/shopnav.component';
import { CartComponent } from '../shared/cart/cart.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
@NgModule({
  declarations: [
    ShopComponent,
    ShopnavComponent,
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
