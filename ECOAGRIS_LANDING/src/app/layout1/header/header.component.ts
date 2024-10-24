import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  sections:any = {};
  curentsection: any ='home';

  constructor( private router: Router) { }


  onSectionChange(event: any) {
    this.curentsection = event;
  }

 
  toggleMenu() {
    document.getElementById('navbarCollapse')?.classList.toggle('show');
    document.getElementById('menu_button')?.classList.toggle('collapsed');
  }

  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      navbar?.classList.add('nav-sticky');
      document.getElementById('page-topbar')?.classList.add('topbar-shadow')
    }
    else {
      navbar?.classList.remove('nav-sticky');
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow')
    }
  }

  clearMenu(color:any) {
    document.querySelector('a[data="id_home"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="id_services"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="id_features"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="id_pricing"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="id_about"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="id_blog"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="id_contact"]')!.setAttribute('style', 'color:'+color+'!important');
  }

}