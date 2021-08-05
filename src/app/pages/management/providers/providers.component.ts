import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';
import { Pagination } from 'src/app/interfaces/pagination.interfaces';
import { Provider } from 'src/app/interfaces/providers.interfaces';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  public providers: Provider[] = [];
  public metaData: Pagination = {
    TotalPages: 0,
    TotalCount: 0,
    PageSize: 0,
    HasNext: false,
    HasPrevious: false,
    CurrentPage: 0
  };

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  public submitted = false;
  public message: string = '';

  public params = {
    SearchTerm: '',
    PageNumber: 1
  }

  constructor(
    private router: Router,
    private providersService: ProvidersService) { }

  ngOnInit(): void {
    this.sendQuery();
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  private sendQuery(): void {
    this.providersService.GetAllProviders(this.params).subscribe(data => {
      console.log(data.headers.get('pagination'));
      this.providers = data.body.providers;
      this.metaData = JSON.parse(data.headers.get('pagination'));
    });
  }

  public search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.sendQuery();
  }

  public addItem(): void {
    if (this.form.invalid) return;
    
    this.submitted = true;

    const provider: Provider = {
      Name: this.form.value.name
    };

    this.providersService.AddProvider(provider).subscribe();
  }

  public leftPage(): void {
    if (this.params.PageNumber == 1) return;
    this.params.PageNumber--;
    this.sendQuery();
  }

  public rightPage(): void {
    this.params.PageNumber++;
    if (this.params.PageNumber <= this.metaData.TotalPages) this.sendQuery();
    else this.leftPage();
  }
}
