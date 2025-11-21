import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DesenvolvimentoComponent } from './desenvolvimento/desenvolvimento.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'desenvolvimento',
    component: DesenvolvimentoComponent
  },





  { path: '**', redirectTo: '' }
]; 