import { Component, OnInit } from '@angular/core';
import { ReCaptchaService } from 'angular-recaptcha3';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit {

  constructor(private recaptchaService: ReCaptchaService) { }

  login() {
   this.recaptchaService.execute({action: 'login'}).then(token => {
     //Backend verification method
     //this.sendTokenToBackend(token);
   });
  }

  onCaptchaResponse(response: string) {

  }

  ngOnInit(): void {
  }

}
