import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DesenvolvimentoComponent } from './desenvolvimento/desenvolvimento.component';
import { MarketingDigitalComponent } from './marketing-digital/marketing-digital.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'desenvolvimento',
    component: DesenvolvimentoComponent
  },

  {
    path: 'marketing-digital',
    component: MarketingDigitalComponent
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
canActivate: [AuthGuard]
},

  // Rota curinga, redireciona para a home
  { path: '**', redirectTo: '' }
];