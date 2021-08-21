import { Component, OnInit } from '@angular/core';
import { IBasketItem, IBasketItemAmount } from 'src/app/interfaces/baskets.interfaces';
import { IBasketParams } from 'src/app/interfaces/params.interfaces';
import { BasketService } from 'src/app/services/basket.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public basketItems: IBasketItem[] = [];

  public params: IBasketParams = {
    SearchTerm: '',
    OrderBy: '',
    PageNumber: 1,
    PageSize: 4
  }

  public totalCost: number = 0;
  public totalAmount: number = 0;

  constructor(
    private basketService: BasketService,
    private paginationService: PaginationService) { }

  public countAll(): void {
    this.totalAmount = 0;
    this.totalCost = 0;
    this.basketItems.forEach(element => {
      this.totalAmount += element.Amount;
      this.totalCost += element.Amount*element.ProductCost;
    });
  }

  public sendQuery(): void {
    this.basketService.GetAllBasketItems(this.params).subscribe(data => {
      this.basketItems = data.body;
      this.paginationService.metaData = JSON.parse(data.headers.get('pagination'));
      this.countAll();
    });
  }

  ngOnInit(): void {
    this.sendQuery();
  }

  public deleteItemFromBasket(id: number | undefined): void {
    this.basketService.DeleteItemFromBasket(id).subscribe(data =>
      this.sendQuery()
    );
  }

  public changeAmount(id: number | undefined): void {
    const inputChange = <HTMLInputElement>document.getElementById(String(id));
    inputChange.setAttribute("disabled","disabled");

    const basketItem: IBasketItemAmount = {
      Id: id,
      Amount: Number(inputChange.value)
    };

    this.basketService.ChangeItemAmount(basketItem).subscribe(data => {
      this.sendQuery()
      inputChange.removeAttribute("disabled");
    });
  }
}
