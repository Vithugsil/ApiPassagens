import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AeroportosComponent } from './Components/aeroportos/aeroportos.component';

const routes: Routes = [{
  path: 'aeroportos', component:AeroportosComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
