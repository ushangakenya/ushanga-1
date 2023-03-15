import { SharedModule } from './pages/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ApprouchComponent } from './sections/approuch/approuch.component'; 
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './nav/footer/footer.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PhonePipe } from './pipes/phone.pipe';  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApprouchComponent,
    FooterComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    SharedModule,
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,  
    BrowserAnimationsModule ,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
