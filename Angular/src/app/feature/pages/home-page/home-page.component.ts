import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  message = '';

  constructor() { }

  ngOnInit(): void {
    this.message = 'Click or touch an object to explore';
  }

  changeText(planet: string) {
    switch(planet) {
      case 'sun' : {
        this.message = 'The Sun';
        break;
      }
      case 'mercury' : {
        this.message = 'Mercury';
        break;
      }
      case 'venus' : {
        this.message = 'Venus';
        break;
      }
      case 'earth' : {
        this.message = 'The Earth';
        break;
      }
      case 'theMoon' : {
        this.message = 'The Moon';
        break;
      }
      case 'mars' : {
        this.message = 'Mars';
        break;
      }
      case 'jupiter' : {
        this.message = 'Jupiter';
        break;
      }
      case 'saturn' : {
        this.message = 'Saturn';
        break;
      }
      case 'uranus' : {
        this.message = 'Uranus';
        break;
      }
      case 'neptune' : {
        this.message = 'Neptune';
        break;
      }
      default: {
        this.message = 'Click or touch an object to explore';
        break;
      }
    }
  }

}
