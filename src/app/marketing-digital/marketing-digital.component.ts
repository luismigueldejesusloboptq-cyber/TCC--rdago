import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener
} from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-marketing-digital',
  templateUrl: './marketing-digital.component.html',
  styleUrls: ['./marketing-digital.component.css']
})
export class MarketingDigitalComponent implements AfterViewInit {

  // canvas references
  @ViewChild('growthCanvas') growthCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trafficCanvas') trafficCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef<HTMLCanvasElement>;

  // stat refs for number animation
  @ViewChild('statReach') statReach!: ElementRef<HTMLElement>;
  @ViewChild('statLeads') statLeads!: ElementRef<HTMLElement>;
  @ViewChild('statSales') statSales!: ElementRef<HTMLElement>;

  // charts map
  charts: { [k: string]: Chart | null } = {
    growth: null,
    traffic: null,
    doughnut: null
  };

  // expanded preview toggles
  expanded: { [k: string]: boolean } = {
    growth: false,
    traffic: false,
    doughnut: false
  };

  // modal for full-screen chart
  modalOpen = false;
  modalChart: 'growth' | 'traffic' | 'doughnut' | null = null;

  // observer for reveal on scroll
  observer!: IntersectionObserver;

  private numbersAnimated = false;

  ngAfterViewInit(): void {
    this.setupObserver();
    this.createAllCharts();
  }

  // IntersectionObserver to add reveal class and trigger number animation
  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.add('active');
            // start numbers when stats row visible
            if (el.classList.contains('stats-row') && !this.numbersAnimated) {
              this.animateStats();
              this.numbersAnimated = true;
            }
          }
        });
      }, { threshold: 0.12 }
    );

    // observe all elements with 'reveal' class
    const nodes = document.querySelectorAll('.reveal, .stats-row');
    nodes.forEach(n => this.observer.observe(n));
  }

  // create charts with gradients + subtle glow
  createAllCharts() {
    this.createGrowthChart();
    this.createTrafficChart();
    this.createDoughnutChart();
    // ensure resize after layout
    setTimeout(() => this.resizeAllCharts(), 120);
  }

  createGrowthChart() {
    const ctx = this.growthCanvas.nativeElement.getContext('2d')!;
    const g = ctx.createLinearGradient(0,0,0,240);
    g.addColorStop(0, 'rgba(96,165,250,0.35)');
    g.addColorStop(1, 'rgba(96,165,250,0)');

    this.charts['growth'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mês 0','Mês 1','Mês 3','Mês 6','Mês 9','Mês 12'],
        datasets: [{
          label: 'Crescimento estimado',
          data: [0, 10, 40, 120, 260, 550],
          borderColor: '#60A5FA',
          backgroundColor: g,
          tension: 0.36,
          fill: true,
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { ticks: { color: '#cfe8ff' } }, y: { ticks: { color: '#cfe8ff' } } },
        animation: { duration: 900, easing: 'easeOutCubic' }
      }
    });
  }

  createTrafficChart() {
    const ctx = this.trafficCanvas.nativeElement.getContext('2d')!;
    this.charts['traffic'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Instagram','Google Ads','SEO','TikTok','E-mail'],
        datasets: [{
          label: 'Tráfego (exemplo)',
          data: [34, 28, 20, 12, 6],
          backgroundColor: ['#7C3AED','#60A5FA','#A78BFA','#06B6D4','#A78BFA'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        animation: { duration: 800, easing: 'easeOutQuart' }
      }
    });
  }

  createDoughnutChart() {
    const ctx = this.doughnutCanvas.nativeElement.getContext('2d')!;
    this.charts['doughnut'] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Orgânico','Pago','Social','E-mail'],
        datasets: [{
          data: [36,42,15,7],
          backgroundColor: ['#60A5FA','#7C3AED','#06B6D4','#A78BFA']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#cfe8ff' } } },
        animation: { duration: 700 }
      }
    });
  }

  // animate the top KPIs
  animateStats() {
    this.countUp(this.statReach.nativeElement, 120, 1000, '+');   // ex: +120%
    this.countUp(this.statLeads.nativeElement, 4800, 1200, '');
    this.countUp(this.statSales.nativeElement, 320, 1200, '+');
  }

  countUp(el: HTMLElement, end: number, duration = 1000, suffix = '') {
    const start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.innerText = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // expand/collapse preview (inline)
  toggleExpand(name: 'growth'|'traffic'|'doughnut') {
    this.expanded[name] = !this.expanded[name];
    // after transition, force resize
    setTimeout(() => this.charts[name]?.resize(), 360);
  }

  // open modal to show chart full-screen (detailed)
  openModal(name: 'growth'|'traffic'|'doughnut') {
    this.modalChart = name;
    this.modalOpen = true;
    // force chart resize after modal visible
    setTimeout(() => this.charts[name]?.resize(), 260);
  }

  closeModal() {
    this.modalOpen = false;
    this.modalChart = null;
  }

  @HostListener('window:resize')
  resizeAllCharts() {
    Object.values(this.charts).forEach(c => c && c.resize());
  }
}
