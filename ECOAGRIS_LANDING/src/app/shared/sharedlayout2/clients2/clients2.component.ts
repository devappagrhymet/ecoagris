import { Component } from '@angular/core';

@Component({
  selector: 'app-clients2',
  templateUrl: './clients2.component.html',
  styleUrls: ['./clients2.component.scss']
})
export class Clients2Component {


  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots:true,
    autoplay:true,
    autoplaySpeed:1500,
    infinite:false
  };

}
