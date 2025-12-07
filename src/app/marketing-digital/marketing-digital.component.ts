import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2
} from '@angular/core';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-marketing-digital',
  templateUrl: './marketing-digital.component.html',
  styleUrls: ['./marketing-digital.component.css']
})
export class MarketingDigitalComponent implements AfterViewInit {

  // refs dos canvases
  @ViewChild('growthCanvas') growthCanvas!: ElementRef;
  @ViewChild('trafficCanvas') trafficCanvas!: ElementRef;
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;

  // stats
  @ViewChild('statReach') statReach!: ElementRef;
  @ViewChild('statLeads') statLeads!: ElementRef;
  @ViewChild('statSales') statSales!: ElementRef;

  // modal
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

  /* ------------------ GRÁFICOS ------------------ */
  initCharts() {
    this.charts['growth'] = new Chart(this.growthCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'],
        datasets: [
          {
            label: 'Crescimento',
            data: [10, 24, 34, 48, 72, 120],
            tension: 0.35,
            borderWidth: 3
          }
        ]
      }
    });

    this.charts['traffic'] = new Chart(this.trafficCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Social', 'Orgânico', 'Pago', 'Email'],
        datasets: [
          { label: 'Tráfego', data: [45, 22, 68, 30] }
        ]
      }
    });

    this.charts['doughnut'] = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Visitantes', 'Leads', 'Oportunidades', 'Vendas'],
        datasets: [
          { data: [2500, 480, 140, 40] }
        ]
      }
    });
  }

  /* ------------------ EXPAND CARD ------------------ */
  toggleExpand(name: string) {
    this.expanded[name] = !this.expanded[name];
  }

  /* ------------------ MODAL ------------------ */
  openModal(chartName: any) {
    this.modalChart = chartName;
    this.modalOpen = true;

    const canvas = this.charts[chartName].canvas;

    this.renderer.appendChild(this.modalChartHost.nativeElement, canvas);
    this.charts[chartName].resize();
  }

  closeModal() {
    if (!this.modalChart) return;

    const canvas = this.charts[this.modalChart].canvas;
    const wrapper = document.querySelector(
      `.${this.modalChart}-wrapper, [#${this.modalChart}Canvas]`
    );

    if (wrapper) this.renderer.appendChild(wrapper, canvas);

    this.modalOpen = false;
    this.modalChart = null;
  }

  /* ------------------ CTA ------------------ */
  openProposal() {
    alert('Abrir formulário / popup / WhatsApp aqui.');
  }
}
