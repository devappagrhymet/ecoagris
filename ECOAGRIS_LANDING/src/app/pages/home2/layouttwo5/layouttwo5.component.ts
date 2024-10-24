import { Component } from '@angular/core';

@Component({
  selector: 'app-layouttwo5',
  templateUrl: './layouttwo5.component.html',
  styleUrls: ['./layouttwo5.component.scss']
})
export class Layouttwo5Component {

  ngOnInit(): void{
    document.getElementById('navbar')?.classList.add('navbar-light')
  }


}
