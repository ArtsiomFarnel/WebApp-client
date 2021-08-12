import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { faHatCowboy } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public fahatcowvoy = faHatCowboy;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.accountService.logout();
  }
}
