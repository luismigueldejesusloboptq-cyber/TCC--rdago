// app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; 
// import { AuthGuard } from './auth.guard'; // ❌ Não precisa importar o Guard aqui!
import { AuthService } from './auth.service'; // ✅ Mantenha o serviço

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 🏆 MANTER APENAS O SERVIÇO DE AUTENTICAÇÃO INJETÁVEL
    AuthService, 
    // AuthGuard, // ❌ REMOVA ESTA LINHA QUE CAUSOU O ERRO
    
    // ... outros provedores, como provideHttpClient(), etc.
  ]
};