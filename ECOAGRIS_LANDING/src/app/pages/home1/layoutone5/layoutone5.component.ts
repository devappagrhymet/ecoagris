import { Component } from '@angular/core';

@Component({
  selector: 'app-layoutone5',
  templateUrl: './layoutone5.component.html',
  styleUrls: ['./layoutone5.component.scss']
})
export class Layoutone5Component {

  ngOnInit(): void{
    document.getElementById('navbar')?.classList.add('navbar-light','bg-white')
  }

}
