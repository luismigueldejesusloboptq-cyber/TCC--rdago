import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor() { }

  open() {
    console.log('Chat aberto!');

    // Aqui futuramente colocamos a lógica real:
    // abrir popup
    // mostrar iframe
    // enviar dados
  }
}
