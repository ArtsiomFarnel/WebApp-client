import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IChangePassword, IUserData, IUserValidation } from 'src/app/interfaces/account.interfaces';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userData: Observable<IUserData> | undefined

  public deleteForm: FormGroup = new FormGroup({});
  public form: FormGroup = new FormGroup({});
  public submitted = false;
  public message: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.userData = this.accountService.getUserData();

    this.deleteForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.form = new FormGroup({
      oldpass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpass: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public deleteUser(): void {
    if (this.deleteForm.invalid) return;
    
    this.submitted = true;
    
    const user: IUserValidation = {
      UserName: this.deleteForm.value.username,
      Password: this.deleteForm.value.newpass
    };

    this.accountService.deleteUser(user).subscribe(() => {
      this.deleteForm.reset();
      window.location.reload();
      this.router.navigate(['/']);
      this.accountService.logout();
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  public changePassword(): void {
    if (this.form.invalid) return;
    
    this.submitted = true;
    
    const user: IChangePassword = {
      OldPassword: this.form.value.oldpass,
      NewPassword: this.form.value.newpass
    };

    this.accountService.changePassword(user).subscribe(() => {
      this.form.reset();
      window.location.reload();
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
