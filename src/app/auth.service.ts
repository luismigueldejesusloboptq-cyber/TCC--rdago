import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Onde a chave do token será armazenada no LocalStorage
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private router: Router) { }

  /**
   * 1. Simula a chamada de login para a API
   * 2. Armazena um token fictício (JWT real viria do backend)
   * 3. Redireciona para o Dashboard
   */
  login(username: string, password: string): boolean {
    // --- IMPORTANTE: Aqui você faria a chamada HTTP real para sua API ---
    // Exemplo: this.http.post<any>('/api/login', { username, password })
    
    // Simulação de verificação de sucesso
    if (username === 'admin' && password === '12345') {
      // ⚠️ Em um projeto real, você armazenaria o Token JWT real que a API retorna.
      localStorage.setItem(this.TOKEN_KEY, 'FALSO_TOKEN_JWT_12345'); 
      console.log('Login bem-sucedido! Redirecionando...');

      // Redireciona o usuário para a área protegida
      this.router.navigate(['/admin/dashboard']); 
      return true;
    }
    
    console.log('Credenciais inválidas.');
    return false;
  }

  /**
   * Verifica se o usuário tem um token válido armazenado.
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    // Em um projeto real, você também verificaria se o token não expirou.
    return !!token; 
  }

  /**
   * Remove o token e redireciona para a tela de login.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    console.log('Logout realizado.');
    this.router.navigate(['/admin/login']);
  }
}