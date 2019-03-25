import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteFormController } from './cliente-form/cliente-from.controller';
import { ClienteListController } from './cliente-list/cliente-list.controller';



const routes: Routes = [
  { path: '', component: ClienteListController },
  { path: 'new', component: ClienteFormController },
  { path: ':id/edit', component: ClienteFormController }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

