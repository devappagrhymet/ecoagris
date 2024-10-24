import { Component } from '@angular/core';

@Component({
  selector: 'app-layouttwo4',
  templateUrl: './layouttwo4.component.html',
  styleUrls: ['./layouttwo4.component.scss']
})
export class Layouttwo4Component {

  ngOnInit(): void{
    document.getElementById('navbar')?.classList.add('navbar-light')
  }
}
