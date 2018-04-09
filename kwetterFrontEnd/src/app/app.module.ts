import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { StartpaginaComponent } from './startpagina/startpagina.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    StartpaginaComponent,
    ProfileComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
