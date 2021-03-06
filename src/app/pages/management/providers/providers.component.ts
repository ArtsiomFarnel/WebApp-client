import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';
import { IProvider } from 'src/app/interfaces/providers.interfaces';
import { PaginationService } from 'src/app/services/pagination.service';
import { IProviderParams } from 'src/app/interfaces/params.interfaces';
import { IPagination } from 'src/app/interfaces/pagination.interfaces';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  public providers: IProvider[] = [];
  
  public addForm: FormGroup = new FormGroup({});
  public updateForm: FormGroup = new FormGroup({});
  public deleteForm: FormGroup = new FormGroup({});

  public submitted = false;
  public message: string = '';
  public isLoading: boolean = false;

  public metaData: IPagination = {
    TotalPages: 0,
    TotalCount: 0,
    PageSize: 0,
    HasNext: false,
    HasPrevious: false,
    CurrentPage: 1
  };

  public params: IProviderParams = {
    SearchTerm: '',
    PageNumber: 1,
    PageSize: 4
  }

  constructor(
    private router: Router,
    private providersService: ProvidersService) { }

  ngOnInit(): void {
    this.metaData.CurrentPage = 1;
    this.sendQuery();
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
    this.updateForm = new FormGroup({
      oldname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      updateid: new FormControl()
    });
    this.deleteForm = new FormGroup({
      deleteid: new FormControl()
    });
  }

  public sendQuery(): void {
    this.isLoading = true;
    this.providersService.GetAllProviders(this.params).subscribe(data => {
      this.providers = data.body;
      this.metaData = JSON.parse(data.headers.get('pagination'));
      this.isLoading = false;
    });
  }

  public onPageChange(page: number = 1): void {
    this.params.PageNumber = page;
    this.sendQuery();
  }

  public search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.onPageChange();
  }

  public putDataToUpdate(provider: IProvider): void {
    this.updateForm.controls['oldname'].setValue(provider.Name);
    this.updateForm.controls['updateid'].setValue(provider.Id);
  }

  public putDataToDelete(provider: IProvider): void {
    this.deleteForm.controls['deleteid'].setValue(provider.Id);
  }

  public updateItem(): void {
    if (this.updateForm.invalid) return;
    
    this.submitted = true;

    const provider: IProvider = {
      Name: this.updateForm.value.oldname,
      Id: this.updateForm.value.updateid
    };
    this.providersService.UpdateProvider(provider).subscribe();
  }

  public deleteItem(): void {
    if (this.deleteForm.invalid) return;
    
    this.submitted = true;
    this.providersService.DeleteProvider( this.deleteForm.value.deleteid).subscribe();
  }

  public addItem(): void {
    if (this.addForm.invalid) return;
    
    this.submitted = true;

    const provider: IProvider = {
      Name: this.addForm.value.name
    };

    this.providersService.AddProvider(provider).subscribe();
  }
}
