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
import { PassageirosComponent } from './components/passageiros/passageiros.component';
import { BagagensComponent } from './components/bagagens/bagagens.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { VoosComponent } from './components/voos/voos.component';
import { PortoesComponent } from './components/portoes/portoes.component';
import { PassagensComponent } from './components/passagens/passagens.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    AeroportosComponent,
    CompanhiasAereasComponent,
    PagamentosComponent,
    AvioesComponent,
    PassageirosComponent,
    BagagensComponent,
    FuncionariosComponent,
    VoosComponent,
    PortoesComponent,
    PassagensComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
  ],
  providers: [HttpClientModule, AeroportosService, CompanhiasAereasService],
  bootstrap: [AppComponent],
})
export class AppModule {}

