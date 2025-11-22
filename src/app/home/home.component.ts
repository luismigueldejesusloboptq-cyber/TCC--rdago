import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as ScrollReveal from 'scrollreveal'; 

interface HistoryItem {
  id: number;
  header: string;
  icon: string;
  content: string;
  isOpen: boolean; 
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit { 

  // Variável para a instância do ScrollReveal (usando 'any' para evitar erros de tipagem)
  sr: any;

  // Array que armazena os dados da história da empresa
  historyData: HistoryItem[] = [
    {
      id: 1,
      header: 'A Visão: Por Que Nascemos?',
      icon: 'pi pi-sparkle',
      content: 'A Ordago nasceu da frustração com soluções digitais que entregam apenas aparência, e não resultados. Nossa fundação é baseada na crença de que a tecnologia deve ser um motor ativo de lucro e crescimento, entregando performance inabalável.',
      isOpen: false
    },
    {
      id: 2,
      header: 'Nossa Missão: O Triângulo de Ouro',
      icon: 'pi pi-target',
      content: 'Focamos na intersecção de três pilares: Desenvolvimento de Elite, Estratégia Digital (SEO/Funil) e Inteligência Artificial (Automação). É a união desses três que garante o sucesso total do projeto do cliente.',
      isOpen: false
    },
    {
      id: 3,
      header: 'Onde Estaremos em 5 Anos?',
      icon: 'pi pi-chart-line',
      content: 'Acreditamos em parcerias de longo prazo. Nosso código é escalável e nosso marketing é adaptável. Seu investimento de hoje continuará gerando resultados sólidos e adaptáveis às futuras mudanças do mercado.',
      isOpen: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Inicializa o ScrollReveal
    this.sr = (ScrollReveal as any)(); 
  }

  // Aplica as animações de rolagem quando o DOM estiver pronto
  ngAfterViewInit(): void {
    if (this.sr) {
        
        // Configuração base para o efeito futurista
        const baseConfig = {
            duration: 1200,
            easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
            scale: 0.95
        };

        // Card 1 (A Visão): Vindo de CIMA/ESQUERDA
        this.sr.reveal('.card-pos-1', {
            ...baseConfig,
            origin: 'top',
            distance: '80px',
            delay: 200 
        });

        // Card 2 (Missão): Vindo da DIREITA
        this.sr.reveal('.card-pos-2', {
            ...baseConfig,
            origin: 'right',
            distance: '100px',
            delay: 400 
        });
        
        // Card 3 (Futuro): Vindo de BAIXO (efeito mais dramático)
        this.sr.reveal('.card-pos-3', {
            ...baseConfig,
            origin: 'bottom',
            distance: '120px',
            duration: 1800,
            delay: 600,
            rotate: { x: 0, y: 0, z: 2 },
            reset: false 
        });
    }
  }

  // Método para alternar o estado de abertura/fechamento
  togglePanel(item: HistoryItem): void {
    item.isOpen = !item.isOpen;
  }
}