import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {


  showIntro: boolean = true;


  private introDurationMs: number = 4000;

  ngOnInit(): void {

    setTimeout(() => {
      this.showIntro = false;

    }, this.introDurationMs);
  }
}