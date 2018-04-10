import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {StartpaginaComponent} from './startpagina/startpagina.component';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './authentication/authentication.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'startpagina', component: StartpaginaComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
