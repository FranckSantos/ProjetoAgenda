import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatosComponent } from './contatos/contatos.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';


const routes: Routes = [
{path: '', redirectTo: '/lista-contatos', pathMatch: 'full'},
{path: 'lista-contatos', component: ListaContatosComponent},
{path: 'cadastro-contatos', component: ContatosComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

