import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReCaptchaModule } from 'angular-recaptcha3';
import { RecaptchaComponent } from './recaptcha.component';




@NgModule({
  declarations: [RecaptchaComponent],
  imports: [
    CommonModule,
    ReCaptchaModule.forRoot({
      invisible: {
          sitekey: '6LcWeTAcAAAAAIIjGQnh7zLC0IRl22MNeao1WJtI', 
      },
      normal: {
          sitekey: '6LcWeTAcAAAAAIIjGQnh7zLC0IRl22MNeao1WJtI', 
      },
      language: 'en'
  })
  ],
  exports: [RecaptchaComponent]
})
export class RecaptchaModule { }