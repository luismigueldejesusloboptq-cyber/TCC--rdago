import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para o *ngIf do Modal
import { Chart } from 'chart.js/auto';
import { AcquireButtonComponent } from '../acquire-button/acquire-button.component';

@Component({
  selector: 'app-marketing-digital',
  standalone: true,
  imports: [CommonModule, AcquireButtonComponent],
  templateUrl: './marketing-digital.component.html',
  styleUrls: ['./marketing-digital.component.css']
})
export class MarketingDigitalComponent implements AfterViewInit {

  // --- Refs dos Gráficos ---
  @ViewChild('growthCanvas') growthCanvas!: ElementRef;
  @ViewChild('trafficCanvas') trafficCanvas!: ElementRef;
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;

  // --- Refs dos Stats (Números animado) ---
  @ViewChild('statReach') statReach!: ElementRef;
  @ViewChild('statLeads') statLeads!: ElementRef;
  @ViewChild('statSales') statSales!: ElementRef;

  // --- NOVO: Refs do Scanner de Realidade ---
  @ViewChild('scannerRef') scannerRef!: ElementRef;
  @ViewChild('scannerOverlay') scannerOverlay!: ElementRef;
  @ViewChild('scannerHandle') scannerHandle!: ElementRef;

  // --- Refs do Modal ---
  @ViewChild('modalChartHost') modalChartHost!: ElementRef;
  modalOpen = false;
  modalChart: 'growth' | 'traffic' | 'doughnut' | null = null;

  charts: any = {};
  expanded: any = {};

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.initCharts();
    this.animateNumbers();
    this.setupReveal();
    this.initScanner(); // <--- Inicializa a lógica do scanner
  }

  /* ------------------ NOVO: LÓGICA DO SCANNER ------------------ */
  initScanner() {
    // Verifica se os elementos existem para evitar erros
    if (!this.scannerRef || !this.scannerOverlay || !this.scannerHandle) return;

    const wrapper = this.scannerRef.nativeElement;
    const overlay = this.scannerOverlay.nativeElement;
    const handle = this.scannerHandle.nativeElement;

    // Função que calcula o movimento
    const move = (clientX: number) => {
      const rect = wrapper.getBoundingClientRect();
      let posX = clientX - rect.left;

      // Limites para não sair da caixa
      if (posX < 0) posX = 0;
      if (posX > rect.width) posX = rect.width;

      // Atualiza largura da camada e posição do botão
      this.renderer.setStyle(overlay, 'width', `${posX}px`);
      this.renderer.setStyle(handle, 'left', `${posX}px`);
    };

    // Listeners de Mouse (PC)
    this.renderer.listen(wrapper, 'mousemove', (e) => move(e.clientX));
    
    // Listeners de Touch (Mobile)
    this.renderer.listen(wrapper, 'touchmove', (e) => {
      // e.preventDefault(); // Opcional: Descomentar se quiser travar o scroll da tela ao arrastar
      move(e.touches[0].clientX);
    });
  }

  /* ------------------ GRÁFICOS (CORES ATUALIZADAS) ------------------ */
  initCharts() {
    // Config global para texto branco nos gráficos
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.1)';

    // 1. Growth Chart (Linha Neon Verde)
    this.charts['growth'] = new Chart(this.growthCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'],
        datasets: [
          {
            label: 'Crescimento',
            data: [10, 24, 34, 48, 72, 120],
            tension: 0.4,
            borderColor: '#00ff88', // Verde Neon
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            borderWidth: 3,
            fill: true,
            pointBackgroundColor: '#000',
            pointBorderColor: '#00ff88',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });

    // 2. Traffic Chart (Barras Azuis)
    this.charts['traffic'] = new Chart(this.trafficCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Social', 'Orgânico', 'Pago', 'Email'],
        datasets: [
          {
            label: 'Tráfego',
            data: [45, 22, 68, 30],
            backgroundColor: [
              '#3b82f6', // Azul
              '#8b5cf6', // Roxo
              '#00ff88', // Verde Neon (Pago costuma ser alto)
              '#f43f5e'  // Rosa
            ],
            borderRadius: 6,
            barThickness: 40
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { display: false },
          x: { grid: { display: false } }
        }
      }
    });

    // 3. Doughnut Chart (Conversão)
    this.charts['doughnut'] = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Visitantes', 'Leads', 'Oportunidades', 'Vendas'],
        datasets: [
          {
            data: [2500, 480, 140, 40],
            backgroundColor: ['#1e293b', '#3b82f6', '#8b5cf6', '#00ff88'],
            borderWidth: 0,
            hoverOffset: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 10, padding: 20 } }
        },
        cutout: '70%'
      }
    });
  }

  /* ------------------ REVEAL ON SCROLL ------------------ */
  setupReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('active');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  /* ------------------ ANIMAR NÚMEROS ------------------ */
  animateNumbers() {
    const animate = (el: any, target: number, speed = 40) => {
      if(!el) return;
      let current = 0;
      const step = target / speed;

      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          el.nativeElement.textContent = target + '+';
          clearInterval(interval);
        } else {
          el.nativeElement.textContent = Math.floor(current);
        }
      }, 24);
    };

    animate(this.statReach, 12000);
    animate(this.statLeads, 340);
    animate(this.statSales, 18);
  }

  /* ------------------ MODAL & EXPAND ------------------ */
  toggleExpand(name: string) {
    this.expanded[name] = !this.expanded[name];
  }

  openModal(chartName: any) {
    this.modalChart = chartName;
    this.modalOpen = true;

    // Move o canvas para o modal
    if (this.charts[chartName]) {
      const canvas = this.charts[chartName].canvas;
      this.renderer.appendChild(this.modalChartHost.nativeElement, canvas);
      this.charts[chartName].resize();
    }
  }

  closeModal() {
    if (!this.modalChart) return;

    // Devolve o canvas para o lugar original
    const canvas = this.charts[this.modalChart].canvas;
    
    // Procura o wrapper correto baseado na estrutura HTML
    // Nota: Como mudamos o HTML para .chart-box e .chart-wrapper, vamos buscar o wrapper genérico
    // que tenha o canvas correspondente se possível, ou usar lógica manual.
    
    // Simplificação: vamos buscar pelo ID ou classe pai
    // No novo HTML, os wrappers não tem IDs únicos fáceis, então vamos fazer um append manual
    // baseado no nome do chart.
    
    let wrapperSelector = '';
    if (this.modalChart === 'growth') wrapperSelector = '.main-chart .chart-wrapper';
    else if (this.modalChart === 'traffic') wrapperSelector = '.side-chart:nth-child(2) .chart-wrapper';
    else if (this.modalChart === 'doughnut') wrapperSelector = '.side-chart:nth-child(3) .chart-wrapper';

    const wrapper = document.querySelector(wrapperSelector);

    if (wrapper) {
      this.renderer.appendChild(wrapper, canvas);
      // Pequeno timeout para garantir que o DOM atualizou antes de redimensionar
      setTimeout(() => this.charts[this.modalChart!].resize(), 50);
    }

    this.modalOpen = false;
    this.modalChart = null;
  }

  /* ------------------ CTA ------------------ */
  openProposal() {
    alert('Abrir formulário de proposta.');
  }
}