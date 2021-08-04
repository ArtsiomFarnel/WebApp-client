import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product, Provider } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  categories$: Observable<Category[]> | undefined;
  providers$: Observable<Provider[]> | undefined;

  products: Product[] = [];
  metaData: any;

  public params = {
    SearchTerm: '',
    Currency: 'EUR',
    OrderBy: '',
    CategoryId: 0,
    ProviderId: 0,
    PageNumber: 1,
    PageSize: 8
  }

  constructor(private productsService: ProductsService,
              private providersService: ProvidersService,
              private categoriesServie: CategoriesService) { }


  private sendQuery() : void {
    this.productsService.GetAllProducts(this.params).subscribe(data => {
      this.products = data.products;
      this.metaData = data.pagination;
    });
  }      

  ngOnInit(): void {
    this.sendQuery();
    this.providers$ = this.providersService.GetProviders();
    this.categories$ = this.categoriesServie.GetCategories();
  }

  search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.sendQuery();
  }

  currencyChange(): void {
    this.params.Currency = (<HTMLInputElement>document.getElementById('currency')).value;
    this.sendQuery();
  }

  order(): void {
    this.params.OrderBy = (<HTMLInputElement>document.getElementById('order')).value;
    this.sendQuery();
  }

  setCategory() : void {
    this.params.CategoryId = Number((<HTMLInputElement>document.getElementById('category')).value);
    this.sendQuery();
  }

  setProvider() : void {
    this.params.ProviderId = Number((<HTMLInputElement>document.getElementById('provider')).value);
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
