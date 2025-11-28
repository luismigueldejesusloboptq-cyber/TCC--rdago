import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Importação do nosso serviço
import { FormsModule } from '@angular/forms'; // ESSENCIAL para o [(ngModel)]
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true, // Se o seu componente for standalone
  imports: [FormsModule,CommonModule], // Adicione FormsModule aos imports
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variáveis vinculadas ao formulário (com [(ngModel)])
  username: string = '';
  password: string = '';
  loginError: boolean = false; // Para exibir a mensagem de erro

  constructor(private authService: AuthService) { }

  // Método chamado quando o formulário é enviado
  submitLogin() {
    this.loginError = false; // Reseta o erro

    // Chama o serviço de autenticação com as credenciais
    const success = this.authService.login(this.username, this.password);

    if (!success) {
      // Se a simulação de login falhar (usuário/senha incorretos)
      this.loginError = true;
    } 
    // Se for sucesso (admin/12345), o AuthService já redireciona para o Dashboard.
  }
}