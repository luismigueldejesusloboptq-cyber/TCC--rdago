import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// O guard é exportado como uma constante (função)
export const AuthGuard: CanActivateFn = (route, state) => {
  // O 'inject' é a maneira moderna de obter serviços dentro de funções de guarda
  const authService = inject(AuthService);  
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Usuário logado, permite a navegação
  }

  // Usuário deslogado, redireciona para a página de login
  // Usamos createUrlTree para Guards que são funções
  return router.createUrlTree(['/admin/login']);
};