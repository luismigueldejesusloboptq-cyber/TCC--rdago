import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DesenvolvimentoComponent } from './desenvolvimento/desenvolvimento.component';
import { MarketingDigitalComponent } from './marketing-digital/marketing-digital.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AutomacoesComponent } from './automacoes/automacoes.component';
import { VendasComponent } from './vendas/vendas.component'; 

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
    path: 'admin/login', 
    component: LoginComponent 
  },

  {
    path: 'marketing-digital',
    component: MarketingDigitalComponent
  },

  {
    path: 'automacoes',
    component: AutomacoesComponent     
  },
  {
    path: 'vendas',         
    component: VendasComponent
  },

  { 
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '' }
  
];
