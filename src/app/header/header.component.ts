import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs'; // Importação útil para animações em Angular

@Component({
selector: 'app-header', // ✅ Seletor padrão para o Header
 templateUrl: './header.component.html', // ✅ Caminho corrigido para a mesma pasta
styleUrls: ['./header.component.css'] // (ou .scss)
})
// ✅ Use HeaderComponent para que o AppComponent possa importá-lo corretamente
export class HeaderComponent implements OnInit, OnDestroy { 

private animationInterval: any; // Mantemos o nome para compatibilidade com o JS
 private currentElementIndex: number = 1;
 private maxElements: number = 4;

constructor(private renderer: Renderer2) { }

ngOnInit(): void {
 this.startAnimation();
 }

 ngOnDestroy(): void {
 if (this.animationInterval) {
clearInterval(this.animationInterval);
 }
 }

  // Restante da sua lógica de animação permanece a mesma, pois estava correta para o TS
 startAnimation(): void {
 this.animationInterval = setInterval(() => {
 if (this.currentElementIndex > this.maxElements) {
 this.currentElementIndex = 1; 
 }

 const elementId = 'len' + this.currentElementIndex;
const element = document.getElementById(elementId);

 if (element) {
 if (element.classList.contains('bounce')) {
 this.renderer.removeClass(element, 'bounce');
 } else {
 this.renderer.addClass(element, 'bounce');
 }
}

 this.currentElementIndex++;
 }, 500);
}
}