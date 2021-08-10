import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/categories.interfaces';
import { Pagination } from 'src/app/interfaces/pagination.interfaces';
import { Product } from 'src/app/interfaces/products.interfaces';
import { Provider } from 'src/app/interfaces/providers.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public categories$: Observable<Category[]> | undefined;
  public providers$: Observable<Provider[]> | undefined;
  public products: Product[] = [];
  public isLoading: boolean = false;

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

  public params = {
    SearchTerm: '',
    Currency: 'EUR',
    OrderBy: '',
    CategoryId: 0,
    ProviderId: 0,
    PageNumber: 1,
    PageSize: 4
  }

  constructor(
    private productsService: ProductsService,
    private providersService: ProvidersService,
    private categoriesServie: CategoriesService,
    private paginationService: PaginationService) { }

  public sendQuery(): void {
    this.params.PageNumber = this.paginationService.metaData.CurrentPage;
    this.isLoading = true;
    this.productsService.GetAllProducts(this.params).subscribe(data => {
      this.products = data.body;
      //this.metaData = JSON.parse(data.headers.get('pagination'));
      this.paginationService.metaData = JSON.parse(data.headers.get('pagination'));
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.paginationService.metaData.CurrentPage = 1;
    this.sendQuery();
    this.providers$ = this.providersService.GetProviders();
    this.categories$ = this.categoriesServie.GetCategories();
  }

  public search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.sendQuery();
  }

  public currencyChange(): void {
    this.params.Currency = (<HTMLInputElement>document.getElementById('currency')).value;
    this.sendQuery();
  }

  public order(): void {
    this.params.OrderBy = (<HTMLInputElement>document.getElementById('order')).value;
    this.sendQuery();
  }

  public setCategory(): void {
    this.params.CategoryId = Number((<HTMLInputElement>document.getElementById('category')).value);
    this.sendQuery();
  }

  public setProvider(): void {
    this.params.ProviderId = Number((<HTMLInputElement>document.getElementById('provider')).value);
    this.sendQuery();
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
