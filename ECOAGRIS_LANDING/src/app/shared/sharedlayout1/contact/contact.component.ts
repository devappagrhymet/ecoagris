import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactform!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
    this.contactform = this.formBuilder.group({
      name: ['',],
      email: ['',],
      subject: ['',],
      contact: ['',],
      message: ['',]
    })
  }

  validSubmit() {
    var name = this.contactform.get("name")!.value;
    var email = this.contactform.get("email")!.value;
    var subject = this.contactform.get("subject")!.value;
    var contact = this.contactform.get("contact")!.value;
    var message = this.contactform.get("message")!.value;

    if (name == "" || name == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a name*</div>";
      return false;
    } else
      if (email == "" || email == null) {
        document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a email*</div>";
        return false;
      } else
        if (subject == "" || subject == null) {
          document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a subject*</div>";
          return false;
        } else
          if (contact == "" || contact == null) {
            document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger'>*Please enter a contact*</div>";
            return false;
          } else
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
