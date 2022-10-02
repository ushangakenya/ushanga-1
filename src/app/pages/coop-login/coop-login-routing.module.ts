import { AddNewComponent } from './add-new/add-new.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopLoginComponent } from './coop-login.component';

const routes: Routes = [
  {path:"",component: CoopLoginComponent},
  {path:"add-new",component: AddNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoopLoginRoutingModule { }
