import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    IntroComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  showIntro: boolean = true;
  private introDurationMs: number = 4000;

  ngOnInit(): void {
    setTimeout(() => {
      this.showIntro = false;
    }, this.introDurationMs);
  }

  ngAfterViewInit(): void {
    this.startParticles();
  }

  startParticles() {
    const canvas = document.getElementById('global-bg') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Partículas premium do footer (comportamento idêntico)
    const particles: any[] = [];
    const count = 70;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.6 + Math.random() * 1.2,
        speed: 0.4 + Math.random() * 0.4,
        hue: 180 + Math.random() * 40,
        offset: Math.random() * Math.PI * 2
      });
    }

    const animate = (t: number) => {
      // ❗ Mesmo fundo do footer
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, 'rgba(2,6,12,0.95)');
      g.addColorStop(1, 'rgba(4,8,14,0.98)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Partículas (sem linhas)
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(t * 0.001 + p.offset) * 0.3;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const alpha = 0.05 + Math.sin(t * 0.002 + p.offset) * 0.03;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}
