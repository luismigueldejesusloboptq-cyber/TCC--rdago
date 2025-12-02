import { Component, OnInit } from '@angular/core';
import { ChatbotService } from "../services/chatbot.service";



@Component({
selector: 'app-desenvolvimento',
templateUrl: './desenvolvimento.component.html',
styleUrls: ['./desenvolvimento.component.css']
})


export class DesenvolvimentoComponent implements OnInit {
// dados de exemplo (substituir por dados reais quando quiser)
timeline = [
{ title: 'Imersão & Estratégia', desc: 'Entendimento do negócio e metas.' },
{ title: 'UX & Arquitetura', desc: 'Protótipos e jornada do usuário.' },
{ title: 'Desenvolvimento', desc: 'Implementação front/back e testes.' },
{ title: 'Integrações', desc: 'APIs, CRMs, automações.' },
{ title: 'Entrega & Escalabilidade', desc: 'Deploy e monitoramento.' }
];


tech = ['Angular', 'Node', 'Python', 'Postgres', 'Firebase', 'API'];


services = [
{ title: 'Sites Profissionais', text: 'Landing, institucional, blog.' },
{ title: 'E-commerce', text: 'Integrações e performance.' },
{ title: 'Plataformas', text: 'Sistemas internos e dashboards.' },
{ title: 'Automação', text: 'Workflows n8n, integrações.' }
];


portfolio = [
{ title: 'Loja X', subtitle: 'E-commerce', image: 'assets/mock-1.png' },
{ title: 'SaaS Y', subtitle: 'Plataforma', image: 'assets/mock-2.png' },
{ title: 'Corp Z', subtitle: 'Institucional', image: 'assets/mock-3.png' }
]; 

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


// Chatbot state
chatOpen = false;

constructor(private chatbot: ChatbotService) {}


ngOnInit(): void {}


toggleChat() {
this.chatOpen = !this.chatOpen;
if (this.chatOpen) this.chatbot.open();
}


requestQuote(plan?: string) {
// placeholder para ação de solicitar orçamento
console.log('Solicitar orçamento:', plan);
// navegar para formulário, abrir modal ou enviar evento
}
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

}

