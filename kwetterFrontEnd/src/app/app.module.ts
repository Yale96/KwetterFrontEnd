import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { StartpaginaComponent } from './startpagina/startpagina.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component'; // <-- NgModel lives here


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    StartpaginaComponent,
    ProfileComponent,
    AuthenticationComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
