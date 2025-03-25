import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path:'', loadComponent:()=> import('./pages/home/home.component').then((c)=> c.HomeComponent), children:[
        {path:'', loadComponent:()=> import('./pages/lista-de-espera/lista-de-espera.component').then((c)=> c.ListaDeEsperaComponent) },
        {path:'usuarios', loadComponent:()=> import('./pages/lista-funcionarios/lista-funcionarios.component').then((c)=> c.ListaFuncionariosComponent) },
        {path:'form', loadComponent:()=> import('./components/form/form.component').then((c)=> c.FormComponent) },
        {path:'form/:id', loadComponent:()=> import('./components/form/form.component').then((c)=> c.FormComponent)},
        {path:'cadastro', loadComponent:()=> import('./pages/cadastro/cadastro.component').then((c)=> c.CadastroComponent) },
        {path:'dependente/:id', loadComponent:()=> import('./pages/cadastro-dependente/cadastro-dependente.component').then((c)=> c.CadastroDependenteComponent) },
        {path:'dependentes', loadComponent:()=> import('./pages/lista-dependentes/lista-dependentes.component').then((c)=> c.ListaDependentesComponent) },
        {path:'dependentes/:id', loadComponent:()=> import('./pages/lista-dependentes/lista-dependentes.component').then((c)=> c.ListaDependentesComponent) },
        
    ], canActivate:[authGuard]},
    {path:'login', component:LoginComponent},
    {path:'**', redirectTo:'' },
];
