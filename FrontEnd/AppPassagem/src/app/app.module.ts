import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AeroportosService } from './services/aeroportos.service';
import { AeroportosComponent } from './components/aeroportos/aeroportos.component';

import { CompanhiasAereasService } from './services/companhias-aereas.service';
import { CompanhiasAereasComponent } from './components/companhias-aereas/companhias-aereas.component';
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { AvioesComponent } from './components/avioes/avioes.component';

@NgModule({
  declarations: [
    AppComponent,
    AeroportosComponent,
    CompanhiasAereasComponent,
    PagamentosComponent,
    AvioesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [HttpClientModule, AeroportosService, CompanhiasAereasService],
  bootstrap: [AppComponent],
})
export class AppModule {}
