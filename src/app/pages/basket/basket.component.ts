import { Component, OnInit } from '@angular/core';
import { BasketItem } from 'src/app/interfaces/baskets.interfaces';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public basketItems: BasketItem[] = [];

  public params = {
    SearchTerm: '',
    Currency: 'EUR',
    OrderBy: '',
    CategoryId: 0,
    ProviderId: 0,
    PageNumber: 1,
    PageSize: 4
  }

  constructor(private basketService: BasketService) { }

  public sendQuery(): void {
    this.basketService.GetAllBasketItems(this.params).subscribe(data => {
      this.basketItems = data.body;
      //this.metaData = JSON.parse(data.headers.get('pagination'));
      //this.paginationService.metaData = JSON.parse(data.headers.get('pagination'));
    });
  }

  ngOnInit(): void {
    this.sendQuery();
  }

  public deleteItemFromBasket(id: number | undefined): void {
    this.basketService.DeleteItemFromBasket(id).subscribe();
    this.sendQuery();
  }
}
