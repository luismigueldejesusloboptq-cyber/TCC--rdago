import { Routes } from '@angular/router';

// 1. Importar o componente Home
import { HomeComponent } from './home/home.component'; 
// 2. Importar o componente Desenvolvimento (já estava correto)
import { DesenvolvimentoComponent } from './desenvolvimento/desenvolvimento.component'; 

export const routes: Routes = [

  { 
    path: '', 
    component: HomeComponent // <--- CORRIGIDO: Agora aponta para a Home Page
  },

  { 
    path: 'desenvolvimento', // <--- Adicionar a rota específica para Desenvolvimento
    component: DesenvolvimentoComponent 
  },
  
  // Você pode adicionar as outras rotas aqui:
  // { path: 'marketing', component: MarketingComponent },
  // { path: 'automacoes', component: AutomacoesComponent },


  // A rota wildcard deve redirecionar para a rota vazia (Home) em caso de erro.
  { path: '**', redirectTo: '' } 
]; 