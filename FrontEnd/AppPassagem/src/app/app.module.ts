import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule} from 'ngx-bootstrap/modal';

import { AeroportosService } from './Services/aeroportos.service'; 

import { AeroportosComponent } from './Components/aeroportos/aeroportos.component';

@NgModule({
  declarations: [
    AppComponent,
    AeroportosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, AeroportosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
