import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // Usar CommonModule para *ngFor
import { Router } from '@angular/router'; // Para o Logout
import { AuthService } from '../auth.service'; // Para o Logout

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Use CommonModule para *ngFor e *ngIf
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // --- CAROUSEL ---
  images = [
    { src: 'assets/img/campanha1.jpg', caption: 'Campanha de Inverno - Aumento de 15%' }, 
    { src: 'assets/img/campanha2.jpg', caption: 'Lançamento de Produto X - 1000 Leads' }, 
    { src: 'assets/img/campanha3.jpg', caption: 'Campanha de Páscoa - Recorde de Vendas' }
  ];
  currentSlide = 0; // Índice da imagem atual
  
  // --- GRÁFICOS (Métricas Simples) ---
  metrics = [
    { title: 'Taxa de Conversão de Leads', value: '4.5%', change: '+0.2%' },
    { title: 'Vendas Mês (R$)', value: 'R$ 22.000', change: '+8%' },
    { title: 'Total de Leads', value: '1.250', change: '-5%' },
    { title: 'ROI Médio', value: '150%', change: '+10%' }
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.startCarousel(); // Inicia o slides automaticamente
  }

  // Lógica para avançar o slide
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }
  
  // Inicia o carousel a cada 5 segundos
  startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); 
  }

  // --- LOGOUT ---
  logout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}