
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {


  isHidden: boolean = false;
  isContentVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {

    const splashScreenDuration = 3800;


    setTimeout(() => {

      this.isHidden = true;


      setTimeout(() => {
        this.isContentVisible = true;
      }, 800);

    }, splashScreenDuration);
  }
}