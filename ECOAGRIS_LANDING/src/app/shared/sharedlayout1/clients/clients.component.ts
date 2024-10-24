import { Component } from '@angular/core';
import { slide } from './data';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  slides: any

  
  ngOnInit(): void {
    this.slides = slide
  }

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots:true,
    autoplay:false,
    infinite:false
  };


}
