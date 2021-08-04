import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  metaData: any;

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  submitted = false;
  message: string = '';
  
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

  sendQuery(): void {
    this.categoriesService.GetAllCategories(this.params).subscribe(data => {
      console.log(data.headers.get('pagination'));
      this.categories = data.body.categories;
      this.metaData = data.body.pagination;
    });;
  }

  search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.sendQuery();

  }

  addItem(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const category: Category = {
      Name: this.form.value.name
    };

    this.categoriesService.AddCategory(category).subscribe();
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
