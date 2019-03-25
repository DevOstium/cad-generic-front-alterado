import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {} from './pages/clientes/cliente.module'


const routes: Routes = [
  { path: 'clientes', loadChildren: './pages/clientes/cliente.module#ClienteModulo' },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
