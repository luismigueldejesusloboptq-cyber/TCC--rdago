import { Component, OnInit } from '@angular/core';
import { ChatbotService } from "../services/chatbot.service";

@Component({
  selector: 'app-desenvolvimento',
  templateUrl: './desenvolvimento.component.html',
  styleUrls: ['./desenvolvimento.component.css']
})
export class DesenvolvimentoComponent implements OnInit {

  // ============================
  // TIMELINE
  // ============================
  timeline = [
    { title: 'Imersão & Estratégia', desc: 'Entendimento do negócio e metas.' },
    { title: 'UX & Arquitetura', desc: 'Protótipos e jornada do usuário.' },
    { title: 'Desenvolvimento', desc: 'Implementação front/back e testes.' },
    { title: 'Integrações', desc: 'APIs, CRMs, automações.' },
    { title: 'Entrega & Escalabilidade', desc: 'Deploy e monitoramento.' }
  ];

  // ============================
  // TECNOLOGIAS
  // ============================
  tech = ['Angular', 'Node', 'Python', 'Postgres', 'Firebase', 'API'];

  // ============================
  // SERVIÇOS
  // ============================
  services = [
    { title: 'Sites Profissionais', text: 'Landing, institucional, blog.' },
    { title: 'E-commerce', text: 'Integrações e performance.' },
    { title: 'Plataformas', text: 'Sistemas internos e dashboards.' },
    { title: 'Automação', text: 'Workflows n8n, integrações.' }
  ];

  // ============================
  // PORTFÓLIO
  // ============================
  portfolio = [
    { title: 'Loja X', subtitle: 'E-commerce', image: 'assets/mock-1.png' },
    { title: 'SaaS Y', subtitle: 'Plataforma', image: 'assets/mock-2.png' },
    { title: 'Corp Z', subtitle: 'Institucional', image: 'assets/mock-3.png' }
  ];

  // ============================
  // TESTIMONIALS
  // ============================
  testimonials = [
    {
      name: 'Mariana Silva',
      role: 'CEO - Loja X',
      text: 'A Órdago transformou nossa loja online. Conversões subiram 80% no primeiro mês.',
      rating: 5,
      date: 'Jul 2025',
      avatar: 'assets/avatar-mariana.jpg'
    },
    {
      name: 'Carlos Pereira',
      role: 'Diretor de TI - SaaS Y',
      text: 'Entrega rápida, código limpo e suporte acima do esperado. Recomendo.',
      rating: 5,
      date: 'Mai 2025',
      avatar: 'assets/avatar-carlos.jpg'
    },
    {
      name: 'Fernanda Gomes',
      role: 'Marketing - Corp Z',
      text: 'Design e performance impecáveis. Nosso tráfego e autoridade melhoraram muito.',
      rating: 4,
      date: 'Abr 2025',
      avatar: 'assets/avatar-fernanda.jpg'
    }
  ];

  // ============================
  // CHATBOT
  // ============================
  chatOpen = false;

  constructor(private chatbot: ChatbotService) {}

  // ============================
  // INIT
  // ============================
  ngOnInit(): void {
    this.animateCanvas();
  }

  // ============================
  // CHATBOT
  // ============================
  toggleChat() {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen) this.chatbot.open();
  }

  requestQuote(plan?: string) {
    console.log('Solicitar orçamento:', plan);
  }

  // ============================
  // EFEITO TILT CARDS (se você quiser usar)
  // ============================
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

  resetTilt(card: any) {
    const element = card.nativeElement;
    element.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  // ============================
  // ANIMAÇÃO DO CANVAS FUTURISTA
  // ============================
  animateCanvas() {
    const canvas: any = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(90,200,255,0.8)";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }
}
