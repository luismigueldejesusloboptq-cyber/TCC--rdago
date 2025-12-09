import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcquireButtonComponent } from '../acquire-button/acquire-button.component'; 
@Component({
  selector: 'app-automacoes',
  standalone: true,
  imports: [CommonModule,AcquireButtonComponent],
  templateUrl: './automacoes.component.html',
  styleUrls: ['./automacoes.component.css']
})
export class AutomacoesComponent implements AfterViewInit {

  @ViewChild('chatMessages') chatMessages!: ElementRef;

  ngAfterViewInit() {
    this.setupReveal();
  }

  // Scroll reveal
  setupReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // CHATBOT SIMPLES (integra com seu n8n)
  async sendMessage(text: string) {
    if (!text.trim()) return;

    this.addMessage(text, 'user');

    // chamada ao seu fluxo n8n
    try {
      const response = await fetch('https://SEU_FLUXO_N8N_WEBHOOK', {
        method: 'POST',
        body: JSON.stringify({ question: text }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      this.addMessage(data.reply || 'Desculpe, não entendi.', 'bot');
    } catch {
      this.addMessage('Erro ao conectar ao assistente.', 'bot');
    }
  }

  addMessage(text: string, sender: 'user' | 'bot') {
    const div = document.createElement('div');
    div.className = sender;
    div.style.margin = '6px 0';
    div.style.padding = '8px 12px';
    div.style.borderRadius = '10px';
    div.style.maxWidth = '85%';

    if (sender === 'user') {
      div.style.background = 'rgba(96,165,250,0.25)';
      div.style.marginLeft = 'auto';
    } else {
      div.style.background = 'rgba(255,255,255,0.15)';
      div.style.marginRight = 'auto';
    }

    div.textContent = text;
    this.chatMessages.nativeElement.appendChild(div);
    this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
  }
}
