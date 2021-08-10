import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/categories.interfaces';
import { Pagination } from 'src/app/interfaces/pagination.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[] = [];
  /*
  public metaData: Pagination = {
    TotalPages: 0,
    TotalCount: 0,
    PageSize: 0,
    HasNext: false,
    HasPrevious: false,
    CurrentPage: 0
  };
  */
  public addForm: FormGroup = new FormGroup({});
  public updateForm: FormGroup = new FormGroup({});
  public deleteForm: FormGroup = new FormGroup({});

  public submitted = false;
  public message: string = '';
  
  public params = {
    SearchTerm: '',
    PageNumber: 1,
    PageSize: 4
  }

  constructor(
    private categoriesService: CategoriesService,
    private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.paginationService.metaData.CurrentPage = 1;
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
    this.params.PageNumber = this.paginationService.metaData.CurrentPage;
    this.categoriesService.GetAllCategories(this.params).subscribe(data => {
      this.categories = data.body;
      this.paginationService.metaData = JSON.parse(data.headers.get('pagination'));
    });
  }

  public search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.sendQuery();
  }

  public putDataToUpdate(category: Category): void {
    this.updateForm.controls['oldname'].setValue(category.Name);
    this.updateForm.controls['updateid'].setValue(category.Id);
  }

  public putDataToDelete(category: Category): void {
    this.deleteForm.controls['deleteid'].setValue(category.Id);
  }

  public updateItem(): void {
    if (this.updateForm.invalid) return;
    
    this.submitted = true;

    const category: Category = {
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

    const category: Category = {
      Name: this.addForm.value.name
    };

    this.categoriesService.AddCategory(category).subscribe();
  }

  /*
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
  */
}
