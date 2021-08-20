import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/products.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { BasketService } from 'src/app/services/basket.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';
import { BasketComponent } from '../../basket/basket.component';

@Component({
  selector: 'app-catalog-item-detail',
  templateUrl: './catalog-item-detail.component.html',
  styleUrls: ['./catalog-item-detail.component.css']
})
export class CatalogItemDetailComponent implements OnInit {

  private Id: number = 0;

  public product: Observable<IProduct> | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private basketService: BasketService,
    public accountService: AccountService,
    private notificationService: NotificationService) { }

  private sendQuery(id: number): void {
    this.product = this.productsService.GetProductById(id);
  }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    this.sendQuery(this.Id);
  }

  public addItemToBasket(product: IProduct): void {
    this.basketService.AddItemToBasket(product?.Id).subscribe(() => {
      this.notificationService.productNotice(`Product ${product?.Name} was added to basket`, product);
    }, (error: HttpErrorResponse) => {
      this.notificationService.textNotice(`Something went wrong`);
    });
  }

}
