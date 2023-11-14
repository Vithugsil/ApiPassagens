import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule} from 'ngx-bootstrap/modal';

import { AeroportosService } from './Services/aeroportos.service'; 
import { AeroportosComponent } from './components/aeroportos/aeroportos.component';

import { CompanhiasAereasService } from './Services/companhias-aereas.service';
import { CompanhiasAereasComponent } from './components/companhias-aereas/companhias-aereas.component';


@NgModule({
  declarations: [
    AppComponent,
    AeroportosComponent,
    CompanhiasAereasComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, AeroportosService, CompanhiasAereasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
