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

  providers: Observable<Provider[]> | undefined;
  //providers: Provider[] = [];

  private params = {
    SearchTerm: ''
  }

  constructor(private router: Router,
    private providersService: ProvidersService) { }

  ngOnInit(): void {
    //this.providersService.GetAllProviders(this.params).subscribe((data: Provider[]) => this.providers = data);
    this.providers = this.providersService.GetAllProviders(this.params);
  }

  search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    //this.providersService.GetAllProviders(this.params).subscribe((data: Provider[]) => this.providers = data);
    this.providers = this.providersService.GetAllProviders(this.params);
  }

}
