import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category, Pagination } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[] = [];
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

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.sendQuery();
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  public sendQuery(): void {
    this.categoriesService.GetAllCategories(this.params).subscribe(data => {
      this.categories = data.body.categories;
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

    const category: Category = {
      Name: this.form.value.name
    };

    this.categoriesService.AddCategory(category).subscribe();
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
