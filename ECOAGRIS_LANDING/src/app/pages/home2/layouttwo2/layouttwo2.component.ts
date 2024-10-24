import { Component } from '@angular/core';

@Component({
  selector: 'app-layouttwo2',
  templateUrl: './layouttwo2.component.html',
  styleUrls: ['./layouttwo2.component.scss']
})
export class Layouttwo2Component {

  ngOnInit(): void{
    document.getElementById('navbar')?.classList.add('navbar-light')
  }
}
