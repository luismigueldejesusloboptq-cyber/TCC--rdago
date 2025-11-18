// src/app/app.component.ts (Corrigido)

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroComponent } from './intro/intro.component'; 
import { HeaderComponent } from './header/header.component'; // <-- NOVO IMPORT
import { FooterComponent } from './footer/footer.component'; // <-- NOVO IMPORT

@Component({
  selector: 'app-root',
  standalone: true,
  // Adicione HeaderComponent e FooterComponent à lista de imports:
  imports: [
    RouterOutlet, 
    IntroComponent, 
    HeaderComponent,  // <-- ADICIONE AQUI
    FooterComponent   // <-- ADICIONE AQUI
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TCC-Ordago';
  
  // Lembre-se, você precisará desta variável para controlar a visibilidade:
  isSiteReady: boolean = false; 
}