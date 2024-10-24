import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xolcy';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'href', 'assets/css/colors/default.css');
    this.renderer.appendChild(document.head, link);
  }
}
