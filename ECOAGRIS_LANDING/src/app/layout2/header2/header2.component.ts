import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component {

  lang:string ='';

  sections:any = {};
  curentsection: any ='home';
  contactform!: UntypedFormGroup;

  constructor(private router: Router,private formBuilder: UntypedFormBuilder) { }
  
  onSectionChange(event: any) {
    this.curentsection = event;
  }


  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
    this.contactform = this.formBuilder.group({
      name: ['', ],
      email: ['', ],
      subject: ['', ],
      contact: ['', ],
      message: ['', ]
    })
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
    document.querySelector('a[data="home"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="services"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="features"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="pricing"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="clients"]')!.setAttribute('style', 'color:'+color+'!important');
    document.querySelector('a[data="portfolio"]')!.setAttribute('style', 'color:'+color+'!important');
  }
  
   /**
    * Returns form
    */
   get form() {
    return this.contactform.controls;
   }
  
   validSubmit() {
    var name =  this.contactform.get("name")!.value;
    var email =  this.contactform.get("email")!.value;
    var subject = this.contactform.get("subject")!.value;
    var contact = this.contactform.get("contact")!.value;
    var message = this.contactform.get("message")!.value;

    if (name == "" || name == null) {
        document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a name*</div>";
        return false;
    }
    if (email == "" || email == null) {
        document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a email*</div>";
        return false;
    }
    if (subject == "" || subject == null) {
        document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a subject*</div>";
        return false;
    }
    if (contact == "" || contact == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a contact*</div>";
      return false;
  }
    if (message == "" || message == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a message*</div>";
      return false;
    }
    document.getElementById('error-msg')!.innerHTML = "";
    return true
  }

  submitForm() {
    if (this.validSubmit()) {
      
    }
  }
  
}
