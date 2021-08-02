import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Observable<Category[]> | undefined;
  //categories: Category[] = []

  private params = {
    SearchTerm: ''
  }

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    //this.categoriesService.GetAllCategories(this.params).subscribe((data: Category[]) => this.categories = data);
    this.categories = this.categoriesService.GetAllCategories(this.params);
  }

  search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    //this.categoriesService.GetAllCategories(this.params).subscribe((data: Category[]) => this.categories = data);
    this.categories = this.categoriesService.GetAllCategories(this.params);

  }

}
