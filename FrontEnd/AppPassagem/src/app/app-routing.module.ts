import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AeroportosComponent } from './components/aeroportos/aeroportos.component';

const routes: Routes = [{
  path: 'Aeroportos', component:AeroportosComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
