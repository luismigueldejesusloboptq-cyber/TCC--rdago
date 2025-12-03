// footer.component.ts — ULTRA CLEAN PREMIUM — QUANTUM LINES EDITION
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit, OnDestroy {

  @ViewChild('bgCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private rafId = 0;

  private width = 0;
  private height = 0;
  private t = 0;

  private mouseX = 0;
  private mouseY = 0;
  private pointerActive = false;

  // Linha estruturada
  private lines: {
    points: { x: number, y: number, offset: number }[];
    hue: number;
  }[] = [];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.resize();
    this.createLines();
    this.start();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  private resizeHandler = () => this.resize();

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = canvas.clientWidth || window.innerWidth;
    this.height = canvas.clientHeight || 420;

    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';

    if (this.ctx) this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    window.removeEventListener('resize', this.resizeHandler);
    window.addEventListener('resize', this.resizeHandler);

    this.createLines();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
    this.pointerActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.pointerActive = false;
  }

  private start(): void {
    const loop = (ts: number) => {
      this.t = ts * 0.001;
      this.draw();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

//linhas
  private createLines() {
    this.lines = [];
    const numLines = 6;

    for (let i = 0; i < numLines; i++) {
      const points = [];
      const segments = 6;
      for (let j = 0; j <= segments; j++) {
        points.push({
          x: (this.width / segments) * j,
          y: this.height * (0.35 + 0.25 * Math.random()),
          offset: Math.random() * 6
        });
      }

      this.lines.push({
        points,
        hue: 190 + i * 8 // tons suaves de azul premium
      });
    }
  }

  private draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // fundo
    const g = ctx.createLinearGradient(0, 0, this.width, this.height);
    g.addColorStop(0, 'rgba(2,6,12,0.95)');
    g.addColorStop(1, 'rgba(4,8,14,0.98)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.width, this.height);

    // desenhar linhas
    this.lines.forEach(line => this.drawLine(ctx, line));

    // partículas
    this.drawParticles(ctx);
  }

  private drawLine(ctx: CanvasRenderingContext2D, line: any) {
    ctx.save();
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = `hsla(${line.hue}, 90%, 70%, 0.15)`;
    ctx.shadowColor = `hsla(${line.hue}, 90%, 70%, 0.12)`;
    ctx.shadowBlur = 18;

    ctx.beginPath();

    for (let i = 0; i < line.points.length; i++) {
      const p = line.points[i];

      const wave = Math.sin(this.t * 1.2 + p.offset) * 26;

      const distMouse = this.pointerActive
        ? Math.hypot(this.mouseX - p.x, this.mouseY - p.y)
        : 9999;

      const influence = Math.max(0, 1 - distMouse / 260);

      const curveY = p.y + wave * (0.4 + influence * 1.6);

      if (i === 0) ctx.moveTo(p.x, curveY);
      else ctx.lineTo(p.x, curveY);
    }

    ctx.stroke();
    ctx.restore();
  }

  // Partículas seguindo as linhas
  private particleList: any[] = [];

  private ensureParticles() {
    if (this.particleList.length > 0) return;

    const count = 70;
    for (let i = 0; i < count; i++) {
      this.particleList.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        speed: 0.6 + Math.random() * 0.6,
        size: 0.6 + Math.random() * 1.2,
        hue: 180 + Math.random() * 40,
        offset: Math.random() * Math.PI * 2
      });
    }
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    this.ensureParticles();

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const p of this.particleList) {
      p.x += Math.sin(this.t * 0.6 + p.offset) * 0.4;
      p.y -= p.speed;

      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }

      const alpha = 0.06 + Math.sin(this.t * 2 + p.offset) * 0.04;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}
