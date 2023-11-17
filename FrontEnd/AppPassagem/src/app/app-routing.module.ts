import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AeroportosComponent } from './components/aeroportos/aeroportos.component';
import { CompanhiasAereasComponent } from './components/companhias-aereas/companhias-aereas.component';
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { AvioesComponent } from './components/avioes/avioes.component';
import { PassageirosComponent } from './components/passageiros/passageiros.component';
import { BagagensComponent } from './components/bagagens/bagagens.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { VoosComponent } from './components/voos/voos.component';
import { PortoesComponent } from './components/portoes/portoes.component';
import { PassagensComponent } from './components/passagens/passagens.component';

const routes: Routes = [
  {path: 'aeroportos', component:AeroportosComponent},
  {path: 'companhias', component:CompanhiasAereasComponent},
  {path: 'pagamentos', component:PagamentosComponent},
  {path: 'avioes', component:AvioesComponent},
  {path: 'passageiros', component:PassageirosComponent},
  {path: 'bagagens', component:BagagensComponent},
  {path: 'funcionarios', component:FuncionariosComponent},
  {path: 'voos', component: VoosComponent},
  {path: 'portoes', component: PortoesComponent},
  {path: 'passagens', component: PassagensComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

