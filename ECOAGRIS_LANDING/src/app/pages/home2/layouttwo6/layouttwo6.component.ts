import { Component } from '@angular/core';

@Component({
  selector: 'app-layouttwo6',
  templateUrl: './layouttwo6.component.html',
  styleUrls: ['./layouttwo6.component.scss']
})
export class Layouttwo6Component {
  ngOnInit(): void{
    document.getElementById('navbar')?.classList.add('navbar-light')
  }
}
