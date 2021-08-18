import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserData, IUserValidation } from 'src/app/interfaces/account.interfaces';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userData: Observable<IUserData> | undefined

  public deleteForm: FormGroup = new FormGroup({});
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
  }

  public deleteUser(): void {
    if (this.deleteForm.invalid) return;
    
    this.submitted = true;
    
    const user: IUserValidation = {
      UserName: this.deleteForm.value.username,
      Password: this.deleteForm.value.password
    };

    this.accountService.deleteUser(user).subscribe(() => {
      this.deleteForm.reset();
      this.accountService.logout();
      window.location.reload();
      this.router.navigate(['/']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
