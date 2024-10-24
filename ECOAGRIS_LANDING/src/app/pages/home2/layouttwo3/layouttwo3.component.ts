import { Component } from '@angular/core';

@Component({
  selector: 'app-layouttwo3',
  templateUrl: './layouttwo3.component.html',
  styleUrls: ['./layouttwo3.component.scss']
})
export class Layouttwo3Component {

  ngOnInit(): void{
    document.querySelector('#navbar')?.classList.add('navbar-light')
  }
  
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots:true,
  };

}
