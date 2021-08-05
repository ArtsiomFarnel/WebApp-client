import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserSignup } from 'src/app/interfaces/interfaces';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  public submitted: boolean = false;
  public message: string = '';

  constructor(
    public authService: AccountService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain)
        this.message = 'Please, enter data';
      else if (params.authFailed)
        this.message = 'Session ended. Enter data again.';
    });

    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(4)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public submit(): void {
    if (this.form.invalid) return;
    if (this.form.value.password != this.form.value.confirmpassword) return;
    
    this.submitted = true;

    const user: UserSignup = {
      UserName: this.form.value.login,
      Password: this.form.value.password,
      FirstName: this.form.value.firstname,
      LastName: this.form.value.lastname,
      Email: this.form.value.email,
      ConfirmPassword: this.form.value.confirmpassword,
      PhoneNumber: this.form.value.phonenumber,
      Roles: ["Client"],
    };

    this.authService.signup(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}