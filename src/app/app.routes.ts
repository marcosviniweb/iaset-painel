import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path:'', loadComponent:()=> import('./pages/home/home.component').then((c)=> c.HomeComponent), children:[
        {path:'', loadComponent:()=> import('./pages/lista-de-espera/lista-de-espera.component').then((c)=> c.ListaDeEsperaComponent) },
        {path:'usuarios', loadComponent:()=> import('./pages/usuarios/usuarios.component').then((c)=> c.UsuariosComponent) },
        {path:'cadastro', loadComponent:()=> import('./pages/cadastro/cadastro.component').then((c)=> c.CadastroComponent) },
    ]},
    {path:'login', component:LoginComponent}
];
