import { Component } from '@angular/core';

@Component({
  selector: 'app-layoutone2',
  templateUrl: './layoutone2.component.html',
  styleUrls: ['./layoutone2.component.scss']
})
export class Layoutone2Component {
  
  ngOnInit(): void{
    document.querySelector('#navbar')?.classList.add('navbar-light')
  }
}
