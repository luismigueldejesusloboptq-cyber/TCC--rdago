import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  console.log("🔐 AuthGuard executado!");

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log("Usuário AUTORIZADO");
    return true;
  }

  console.log("Usuário NÃO autorizado");
  return router.createUrlTree(['/admin/login']);
};
