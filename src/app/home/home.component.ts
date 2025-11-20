import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor e *ngIf
import { RouterLink } from '@angular/router';

interface HistoryItem {
  id: number;
  header: string;
  icon: string;
  content: string;
  isOpen: boolean; // Propriedade que controlará o estado (aberto/fechado)
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink // Manter se você usar links no componente
    // Removemos AccordionModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Array que armazena os dados da história da empresa e o estado de abertura
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
  }

  // Método para alternar o estado de abertura/fechamento
  togglePanel(item: HistoryItem): void {
    item.isOpen = !item.isOpen;
    // Se você quiser que apenas um painel abra por vez, adicione:
    /*
    this.historyData.forEach(i => {
      if (i.id !== item.id) {
        i.isOpen = false;
      }
    });
    */
  }
}