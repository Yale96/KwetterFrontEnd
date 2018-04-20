import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { StartpaginaComponent } from './startpagina/startpagina.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component';
import {HttpModule} from '@angular/http'; // <-- NgModel lives here
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptor} from './TokenInterceptor';
import {AuthenticationService} from './AuthenticationService';
import {ApiService} from './ApiService';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    StartpaginaComponent,
    ProfileComponent,
    AuthenticationComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ApiService, HttpClientModule],
  bootstrap: [AppComponent]

})
export class AppModule { }
