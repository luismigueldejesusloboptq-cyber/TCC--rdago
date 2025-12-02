import { Component, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

interface Metric {
  label: string;
  value: number;
  formatted?: string;
  sparkData: number[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bgCanvas', { static: true }) bgCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChildren('spark') sparklines!: QueryList<ElementRef<HTMLCanvasElement>>;

  // injected for logout
  constructor(private authService: AuthService, private router: Router) {}

  // Chart instances
  private lineChart?: Chart;
  private barChart?: Chart;
  private sparkCharts: Chart[] = [];

  // animation handles (particles)
  private particlesAnimId = 0;
  private lastTime = 0;

  // data
  metrics: Metric[] = [
    { label: 'Usuários Ativos', value: 1245, sparkData: [5,7,6,8,9,7,10] },
    { label: 'Vendas (Mês)', value: 22430, sparkData: [120,150,140,190,170,200,220] },
    { label: 'Leads', value: 1089, sparkData: [12,9,14,11,16,13,18] },
    { label: 'Conversão', value: 4.5, sparkData: [3.8,4.0,4.1,4.3,4.5,4.6,4.5] }
  ];

  labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul'];
  salesData = [22000, 25000, 18000, 32000, 28000, 35000, 40000];
  productData = [120, 190, 30, 80, 140];

  // particles
  private ctxBg!: CanvasRenderingContext2D;
  private particles: Array<{x:number,y:number, vx:number, vy:number, r:number, hue:number}> = [];

  ngAfterViewInit(): void {
    // BG particles
    this.ctxBg = this.bgCanvas.nativeElement.getContext('2d')!;
    this.resizeBgCanvas();
    this.initParticles(60); // reduzido para performance; ajuste se quiser
    this.runParticles();

    // create Chart.js charts
    this.createLineChart();
    this.createBarChart();

    // create sparklines after view children rendered
    setTimeout(() => this.createSparklines(), 60);

    // animate counters
    this.metrics.forEach((m, i) => this.animateCountUp(i, m.value, 900 + i*220));

    // resize handler
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.particlesAnimId);
    window.removeEventListener('resize', this.onResize);
    // destroy charts
    this.lineChart?.destroy();
    this.barChart?.destroy();
    this.sparkCharts.forEach(c => c.destroy());
  }

  // ---------- Logout ----------
  logout() {
    try {
      this.authService.logout();
    } catch (e) {
      // ignore if authService not implemented
    }
    this.router.navigate(['/admin/login']);
  }

  // ---------- Background canvas helpers ----------
  private resizeBgCanvas = () => {
    const c = this.bgCanvas.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.floor(c.clientWidth * dpr);
    c.height = Math.floor(c.clientHeight * dpr);
    this.ctxBg.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private initParticles(count: number) {
    this.particles = [];
    const w = this.bgCanvas.nativeElement.clientWidth;
    const h = this.bgCanvas.nativeElement.clientHeight;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 0.8 + Math.random() * 2.4,
        hue: 180 + Math.random()*60
      });
    }
  }

  private runParticles = (t?: number) => {
    const now = t || performance.now();
    const dt = Math.min(50, now - (this.lastTime || now));
    this.lastTime = now;
    const ctx = this.ctxBg;
    const canvas = this.bgCanvas.nativeElement;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    for (let p of this.particles) {
      p.x += p.vx * dt * 0.06;
      p.y += p.vy * dt * 0.06;

      if (p.x < -10) p.x = canvas.clientWidth + 10;
      if (p.x > canvas.clientWidth + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.clientHeight + 10;
      if (p.y > canvas.clientHeight + 10) p.y = -10;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*8);
      grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, 0.18)`);
      grad.addColorStop(0.6, `hsla(${p.hue+30}, 80%, 55%, 0.06)`);
      grad.addColorStop(1, `rgba(0,0,0,0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r*8, 0, Math.PI*2);
      ctx.fill();
    }

    // connecting lines
    ctx.lineWidth = 0.5;
    for (let i=0;i<this.particles.length;i++){
      for (let j=i+1;j<this.particles.length;j++){
        const a = this.particles[i], b = this.particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(120,200,255,${1 - dist/120} )`;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }

    this.particlesAnimId = requestAnimationFrame(this.runParticles);
  }

  // ---------- Chart.js creations ----------
  private createLineChart() {
    const ctx = this.lineCanvas.nativeElement.getContext('2d')!;
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Vendas Mensais (R$)',
          data: this.salesData,
          borderWidth: 2.5,
          tension: 0.35,
          pointRadius: 4,
          backgroundColor: (ctxEl: any) => {
            // fallback solid gradient-like color
            return 'rgba(41,212,255,0.08)';
          },
          borderColor: 'rgba(41,212,255,0.95)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.75)' } },
          y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: 'rgba(255,255,255,0.7)' } }
        }
      }
    });
  }

  private createBarChart() {
    const ctx = this.barCanvas.nativeElement.getContext('2d')!;
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['A','B','C','D','E'],
        datasets: [{
          label: 'Vendas (unidades)',
          data: this.productData,
          backgroundColor: [
            'rgba(123,97,255,0.95)',
            'rgba(41,212,255,0.95)',
            'rgba(123,97,255,0.85)',
            'rgba(41,212,255,0.75)',
            'rgba(123,97,255,0.7)'
          ],
          borderRadius: 8,
          barPercentage: 0.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: {
          x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.75)' } },
          y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: 'rgba(255,255,255,0.75)' } }
        }
      }
    });
  }

  private createSparklines() {
    // destroy existing spark charts (if any)
    this.sparkCharts.forEach(c => c.destroy());
    this.sparkCharts = [];

    // ensure sparklines match metrics count
    this.sparklines.forEach((elRef, idx) => {
      const canvas = elRef.nativeElement;
      const ctx = canvas.getContext('2d')!;
      // set fixed small height via style to help Chart.js sizing
      canvas.style.height = '34px';
      canvas.style.width = '90px';

      const data = this.metrics[idx]?.sparkData || [];
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((_, i) => i.toString()),
          datasets: [{
            data,
            borderWidth: 1.5,
            tension: 0.3,
            pointRadius: 0,
            borderColor: 'rgba(255,255,255,0.95)',
            backgroundColor: 'rgba(255,255,255,0.06)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: {
            x: { display: false },
            y: { display: false }
          },
          elements: { line: { capBezierPoints: true } }
        }
      });

      this.sparkCharts.push(chart);
    });
  }

  // ---------- Count up animation ----------
  private animateCountUp(index:number, target:number, duration = 1000){
    const start = performance.now();
    const startVal = 0;
    const update = (now:number) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      const current = startVal + (target - startVal) * ease;
      const m = this.metrics[index];
      if (m.label.toLowerCase().includes('convers')) {
        m.formatted = (current).toFixed(1) + '%';
      } else if (m.label.toLowerCase().includes('vendas')) {
        m.formatted = 'R$ ' + Math.round(current).toLocaleString();
      } else {
        m.formatted = Math.round(current).toLocaleString();
      }
      if (t < 1) requestAnimationFrame(update);
      else {
        if (m.label.toLowerCase().includes('convers')) m.formatted = m.value.toFixed(1) + '%';
        else if (m.label.toLowerCase().includes('vendas')) m.formatted = 'R$ ' + m.value.toLocaleString();
        else m.formatted = m.value.toLocaleString();
      }
    };
    requestAnimationFrame(update);
  }

  // ---------- Resize handler ----------
  private onResize = () => {
    this.resizeBgCanvas();
    // Chart.js are responsive; trigger update to ensure correct sizing
    this.lineChart?.resize();
    this.barChart?.resize();
    this.sparkCharts.forEach(c => c.resize());
  }
}
