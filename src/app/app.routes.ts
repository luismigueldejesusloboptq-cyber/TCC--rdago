import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DesenvolvimentoComponent } from './desenvolvimento/desenvolvimento.component';


// Certifique-se de que os caminhos de importação estão corretos
import { LoginComponent } from './login/login.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard'; 
import { inject } from '@angular/core';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'desenvolvimento',
    component: DesenvolvimentoComponent
  },

  // 🔒 ROTA PÚBLICA DE ADMIN: FORMULÁRIO DE LOGIN
  { 
    path: 'admin/login', 
    component: LoginComponent 
  },

  // 🛡️ ROTA PROTEGIDA: DASHBOARD
 { 
  path: 'admin/dashboard', 
  component: DashboardComponent,
  // Use o 'inject' para obter a instância da classe AuthGuard
  canActivate: [() => inject(AuthGuard).canActivate()] 
},

  // Rota curinga, redireciona para a home
  { path: '**', redirectTo: '' }
];