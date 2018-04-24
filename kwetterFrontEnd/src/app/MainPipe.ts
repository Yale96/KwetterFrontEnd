import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {CountdownPipe} from './CountdownPipe';

@NgModule({
  declarations:[CountdownPipe],
  imports:[CommonModule],
  exports:[CountdownPipe]
})

export class MainPipe{}
