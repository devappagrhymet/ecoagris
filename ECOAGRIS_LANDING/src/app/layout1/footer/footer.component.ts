import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isVisible = false;
  year = new Date().getFullYear();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  /**
  * Onclick color change
  * @param theme theme color
  */
  setColor(theme: any) {
    // document.getElementById('color-opt')?.setAttribute('href', 'assets/css/colors/' + theme + '.css');
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'href', 'assets/css/colors/' + theme + '.css');
    this.renderer.appendChild(document.head, link);
  }

  toggleSwitcher() {
    this.isVisible = !this.isVisible;
  }
}
