import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs'; 


@Component({
selector: 'app-header', 
 templateUrl: './header.component.html', 
styleUrls: ['./header.component.css'] 
})

export class HeaderComponent implements OnInit, OnDestroy { 

private animationInterval: any; 
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