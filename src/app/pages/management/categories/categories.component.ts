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

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  submitted = false;
  message: string = '';
  
  private params = {
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
      this.categories = data;
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

}
