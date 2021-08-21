import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/interfaces/categories.interfaces';
import { IPagination } from 'src/app/interfaces/pagination.interfaces';
import { ICategoryParams } from 'src/app/interfaces/params.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories: ICategory[] = [];

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
  
  public params: ICategoryParams = {
    SearchTerm: '',
    PageNumber: 1,
    PageSize: 4
  }

  constructor(
    private categoriesService: CategoriesService) { }

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
    this.categoriesService.GetAllCategories(this.params).subscribe(data => {
      this.categories = data.body;
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

  public putDataToUpdate(category: ICategory): void {
    this.updateForm.controls['oldname'].setValue(category.Name);
    this.updateForm.controls['updateid'].setValue(category.Id);
  }

  public putDataToDelete(category: ICategory): void {
    this.deleteForm.controls['deleteid'].setValue(category.Id);
  }

  public updateItem(): void {
    if (this.updateForm.invalid) return;
    
    this.submitted = true;

    const category: ICategory = {
      Name: this.updateForm.value.oldname,
      Id: this.updateForm.value.updateid
    };
    this.categoriesService.UpdateCategory(category).subscribe();
  }

  public deleteItem(): void {
    if (this.deleteForm.invalid) return;
    
    this.submitted = true;
    this.categoriesService.DeleteCategory( this.deleteForm.value.deleteid).subscribe();
  }

  public addItem(): void {
    if (this.addForm.invalid) return;
    
    this.submitted = true;

    const category: ICategory = {
      Name: this.addForm.value.name
    };

    this.categoriesService.AddCategory(category).subscribe();
  }
}
