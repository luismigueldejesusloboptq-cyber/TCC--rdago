import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Plan {
  title: string;
  price: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent {

  selectedService: string = 'dev';
  showModal: boolean = false;
  selectedPlanName: string = '';

  services = [
    { label: 'Desenvolvimento de Sites', value: 'dev' },
    { label: 'Marketing Digital', value: 'mkt' },
    { label: 'Automação e IA', value: 'auto' },
    { label: 'Pacote Completo', value: 'full' }
  ];

  plans: Record<string, Plan[]> = {
    dev: [
      {
        title: 'Site Profissional',
        price: 'R$ 1.497',
        description: 'Site moderno, rápido e responsivo.',
        features: ['Design Premium', 'SEO Inicial', 'Até 5 páginas', 'Integrações básicas']
      },
      {
        title: 'Site Avançado',
        price: 'R$ 2.497',
        description: 'Performance total para empresas sérias.',
        features: ['SEO Avançado', 'Blog + Dashboard', 'Performance Turbo', 'Integrações Avançadas']
      }
    ],

    mkt: [
      {
        title: 'Marketing Essencial',
        price: 'R$ 897/mês',
        description: 'Perfeito para gerar leads diariamente.',
        features: ['Redes Sociais', 'Conteúdo', 'Relatórios Semanais']
      },
      {
        title: 'Marketing Performance',
        price: 'R$ 1.497/mês',
        description: 'Voltado para escalar conversões.',
        features: ['Anúncios Meta/Google', 'Funis de Vendas', 'Copywriting']
      }
    ],

    auto: [
      {
        title: 'Automação Básica',
        price: 'R$ 497',
        description: 'Automatize processos simples.',
        features: ['Chatbots', 'Integrações N8N', 'Fluxos Básicos']
      },
      {
        title: 'Automação + IA Avançada',
        price: 'R$ 1.297',
        description: 'IA personalizada + automação total.',
        features: ['IA Proprietária', 'Dashboards', 'Automação Completa']
      }
    ],

    full: [
      {
        title: 'Pacote Supremo',
        price: 'R$ 3.997',
        description: 'Tudo junto para máxima performance.',
        features: ['Site + SEO', 'Marketing Digital', 'IA + Automação', 'Consultoria Estratégica']
      }
    ]
  };

  get selectedPlans(): Plan[] {
    return this.plans[this.selectedService];
  }

  onServiceChange(event: any) {
    this.selectedService = event.target.value;
  }

  openPayment(planName: string) {
    this.selectedPlanName = planName;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
