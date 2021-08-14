import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interfaces';
import { BasketService } from 'src/app/services/basket.service';
import { ProductsService } from 'src/app/services/products.service';
import { BasketComponent } from '../../basket/basket.component';

@Component({
  selector: 'app-catalog-item-detail',
  templateUrl: './catalog-item-detail.component.html',
  styleUrls: ['./catalog-item-detail.component.css']
})
export class CatalogItemDetailComponent implements OnInit {

  private Id: number = 0;

  public product: Observable<Product> | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private basketService: BasketService) { }

  private sendQuery(id: number): void {
    this.product = this.productsService.GetProductById(id);
  }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    this.sendQuery(this.Id);
  }

  public addItemToBasket(id: number | undefined): void {
    this.basketService.AddItemToBasket(id).subscribe();
  }

}
