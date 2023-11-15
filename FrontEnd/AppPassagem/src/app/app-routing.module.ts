import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AeroportosComponent } from './components/aeroportos/aeroportos.component';
import { CompanhiasAereasComponent } from './components/companhias-aereas/companhias-aereas.component';
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { AvioesComponent } from './components/avioes/avioes.component';

const routes: Routes = [
  {path: 'aeroportos', component:AeroportosComponent},
  {path: 'companhias', component:CompanhiasAereasComponent},
  {path: 'pagamentos', component:PagamentosComponent},
  {path: 'avioes', component:AvioesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
