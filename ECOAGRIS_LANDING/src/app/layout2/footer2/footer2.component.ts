import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-footer2',
  templateUrl: './footer2.component.html',
  styleUrls: ['./footer2.component.scss']
})
export class Footer2Component {
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
    //this.isVisible = false;
  }
}
