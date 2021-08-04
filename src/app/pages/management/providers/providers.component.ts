import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/interfaces/interfaces';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];
  metaData: any;

  public params = {
    SearchTerm: '',
    PageNumber: 1
  }

  constructor(private router: Router,
    private providersService: ProvidersService) { }

  ngOnInit(): void {
    this.sendQuery();
  }

  public sendQuery() : void {
    this.providersService.GetAllProviders(this.params).subscribe(data => {
      console.log(data.headers.get('pagination'));
      this.providers = data.body.providers;
      this.metaData = data.body.pagination;
    });
  }

  search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.sendQuery();
  }

  leftPage(): void {
    if (this.params.PageNumber == 1) return;
    this.params.PageNumber--;
    this.sendQuery();
  }

  rightPage(): void {
    this.params.PageNumber++;
    if (this.params.PageNumber <= this.metaData.totalPages)
      this.sendQuery();
    else
      this.leftPage();
  }

}
