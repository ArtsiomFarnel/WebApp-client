import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AccountService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
    alert("jwt token was removed!");
 }

}