import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  // Aqui armazenamos o card que o usuário clicou
  selectedService: any = null;

  // Campos fictícios do formulário
  userData = {
    nome: '',
    email: '',
    telefone: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Pegamos o ID enviado pelo routerLink do card
    const serviceId = this.route.snapshot.paramMap.get('id');

    // Serviços fictícios – depois podemos expandir
    const servicesCatalog = [
      {
        id: '1',
        titulo: 'Gestão de Tráfego Pago',
        preco: 'R$ 497/mês',
        descricao: 'Campanhas otimizadas para Facebook Ads e Google Ads.'
      },
      {
        id: '2',
        titulo: 'Branding & Identidade Visual',
        preco: 'R$ 397',
        descricao: 'Criação de logotipo, manual de marca e identidade completa.'
      },
      {
        id: '3',
        titulo: 'Website Profissional',
        preco: 'R$ 697',
        descricao: 'Site moderno, responsivo e otimizado para conversão.'
      }
    ];

    // Seleciona o item de acordo com o clique
    this.selectedService = servicesCatalog.find(s => s.id === serviceId);
  }

  // Apenas exibe os dados fictícios — podemos criar animação aqui depois
  finalizarCompra() {
    console.log('Dados enviados:', this.userData);
    console.log('Serviço escolhido:', this.selectedService);

    alert('Sua solicitação foi enviada! (Fictício)');
  }
}
