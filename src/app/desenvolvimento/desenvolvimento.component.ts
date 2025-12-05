import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ChatbotService } from "../services/chatbot.service";

@Component({
  selector: 'app-desenvolvimento',
  templateUrl: './desenvolvimento.component.html',
  styleUrls: ['./desenvolvimento.component.css']
})
export class DesenvolvimentoComponent implements OnInit, AfterViewInit {

  // =======================================================
  // HERO — LINHA DE PRODUÇÃO DIGITAL
  // =======================================================
  // Mantido para referências futuras, mas não será usado para Parallax.
  @ViewChild('heroContainer') heroContainer!: ElementRef<HTMLElement>;
  @ViewChild('productionLine') productionLine!: ElementRef<HTMLElement>;

  // Variáveis de parallax (mantidas, mas não utilizadas)
  mouseX = 0;
  mouseY = 0;
  parallaxIntensity = 22;

  // timeline (mantido)
  timeline = [
    { title: 'Imersão & Estratégia', desc: 'Entendimento do negócio e metas.' },
    { title: 'UX & Arquitetura', desc: 'Protótipos e jornada do usuário.' },
    { title: 'Desenvolvimento', desc: 'Implementação front/back e testes.' },
    { title: 'Integrações', desc: 'APIs, CRMs, automações.' },
    { title: 'Entrega & Escalabilidade', desc: 'Deploy e monitoramento.' }
  ];

  // demais dados (mantido)
  tech = ['Angular', 'Node', 'Python', 'Postgres', 'Firebase', 'API'];
  services = [ /* ... */ ];
  portfolio = [ /* ... */ ];
  testimonials = [ /* ... */ ];

  chatOpen = false;

  constructor(private chatbot: ChatbotService) {}

  ngOnInit(): void {
    this.animateCanvas(); // partículas
  }

  ngAfterViewInit(): void {
    // A animação da linha de produção agora é controlada 100% pelo CSS.
    // this.animateDigitalLine() foi removido daqui.
    this.triggerScrollAnimations();
  }

  // ===== CHATBOT (mantido) =====
  toggleChat() {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen) this.chatbot.open();
  }

  requestQuote(plan?: string) { console.log('Solicitar orçamento:', plan); }

  // ===== PARALLAX (REMOVIDO) =====
  // A função onMouseMove foi removida para eliminar o movimento indesejado da tela.
  
  // ===== LINHA DE PRODUÇÃO (REMOVIDO) =====
  // A função animateDigitalLine foi removida para evitar conflito com o CSS loop.
  
  // ===== SCROLL REVEAL (mantido) =====
  triggerScrollAnimations() {
    const items = document.querySelectorAll('.reveal');
    const reveal = () => {
      items.forEach((el: any) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', reveal);
    reveal();
  }

  // ===== TILT (mantido) =====
  tilt(event: MouseEvent, card: any) {
    const element = card.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    element.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  }
  resetTilt(card: any) { const element = card.nativeElement; element.style.transform = "rotateX(0deg) rotateY(0deg)"; }

  // ===== CANVAS PARTÍCULAS (mantido) =====
  animateCanvas() {
    const canvas: any = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6, // concentra mais em cima
      r: Math.random() * 2.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(90,200,255,0.08)";
        ctx.fill();

        // tiny bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.r * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120,200,255,0.28)";
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();
  }
}