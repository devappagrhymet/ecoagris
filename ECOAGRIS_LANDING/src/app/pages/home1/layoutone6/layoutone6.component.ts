import { Component } from '@angular/core';

@Component({
  selector: 'app-layoutone6',
  templateUrl: './layoutone6.component.html',
  styleUrls: ['./layoutone6.component.scss']
})
export class Layoutone6Component {

  ngOnInit(): void{
    document.getElementById('navbar')?.classList.add('navbar-light')
  }

  slideConfig ={

    slidesToShow: 1.5,
    arrows: true,
    dots: true,
    autoplay:true,
    infinite: true,
    autoplaySpeed:1500,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  }


}
