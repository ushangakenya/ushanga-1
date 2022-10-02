import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{path:"",component:HomeComponent},
{
  path: 'registration',
  loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)
},
{
  path: 'partnerships',
  loadChildren: () => import('./pages/partnerships/partnerships.module').then(m => m.PartnershipsModule)
},
{
  path: 'shop',
  loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
},
{
  path: 'contact',
  loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
},
{
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
},
{
  path: 'user-profile',
  loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
},
{
  path: 'cooperatives',
  loadChildren: () => import('./pages/coop-login/coop-login.module').then(m => m.CoopLoginModule)
},
{
  path: 'admin',
  loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
