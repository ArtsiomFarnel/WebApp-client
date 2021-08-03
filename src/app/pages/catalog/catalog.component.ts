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

  products: Observable<Product[]> | undefined;
  categories: Observable<Category[]> | undefined;
  providers: Observable<Provider[]> | undefined;
  //products: Product[] = [];

  private params = {
    SearchTerm: '',
    Currency: 'EUR',
    OrderBy: '',
    CategoryId: 0,
    ProviderId: 0
  }

  constructor(private productsService: ProductsService,
              private providersService: ProvidersService,
              private categoriesServie: CategoriesService) { }

  ngOnInit(): void {
    
    //this.productsService.GetAllProducts(this.params).subscribe((data: Product[]) => this.products = data);
    this.products = this.productsService.GetAllProducts(this.params);
    this.providers = this.providersService.GetProviders();
    this.categories = this.categoriesServie.GetCategories();
  }

  search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    //this.productsService.GetAllProducts(this.params).subscribe((data: Product[]) => this.products = data);
    this.products = this.productsService.GetAllProducts(this.params);
  }

  currencyChange(): void {
    this.params.Currency = (<HTMLInputElement>document.getElementById('currency')).value;
    //this.productsService.GetAllProducts(this.params).subscribe((data: Product[]) => this.products = data);
    this.products = this.productsService.GetAllProducts(this.params);
  }

  order(): void {
    this.params.OrderBy = (<HTMLInputElement>document.getElementById('order')).value;
    //this.productsService.GetAllProducts(this.params).subscribe((data: Product[]) => this.products = data);
    this.products = this.productsService.GetAllProducts(this.params);
  }

  setCategory() : void {
    this.params.CategoryId = Number((<HTMLInputElement>document.getElementById('category')).value);
    this.products = this.productsService.GetAllProducts(this.params);
  }

  setProvider() : void {
    this.params.ProviderId = Number((<HTMLInputElement>document.getElementById('provider')).value);
    this.products = this.productsService.GetAllProducts(this.params);
  }

}
