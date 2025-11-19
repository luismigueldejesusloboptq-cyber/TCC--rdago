import { Routes } from '@angular/router';


import { DesenvolvimentoComponent } from './desenvolvimento/desenvolvimento.component'; 
;

export const routes: Routes = [

  { 
    path: '', 
    component: DesenvolvimentoComponent 
  },
  




  { path: '**', redirectTo: '' } 
];