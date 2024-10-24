import { Component } from '@angular/core';

@Component({
  selector: 'app-layoutone3',
  templateUrl: './layoutone3.component.html',
  styleUrls: ['./layoutone3.component.scss']
})
export class Layoutone3Component {


  ngOnInit(): void{
    document.querySelector('#navbar')?.classList.add('navbar-light')
  }

  slides = [
    {
      badge: 'Find Your Element',
      title: 'Powering Business',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est error maxime ullam veritatis beatae impedit sit illo nulla nemo dolor mollitia ea unde.'
    },
    {
      badge: 'Multi purpose theme',
      title: 'To Grow Business',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est error maxime ullam veritatis beatae impedit sit illo nulla nemo dolor mollitia ea unde.'
    },
    {
      badge: 'Start Connecting',
      title: 'With Online Customers',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est error maxime ullam veritatis beatae impedit sit illo nulla nemo dolor mollitia ea unde.'
    }
  ];

  activeSlideIndex: number = 0;

  // onSlide(event: any) {
  //   this.activeSlide = event.currentSlide;
  // }

  slide(event: any) {
    
  }
}
