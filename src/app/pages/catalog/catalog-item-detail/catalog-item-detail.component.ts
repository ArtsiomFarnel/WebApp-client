import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/products.interfaces';
import { ProductsService } from 'src/app/services/products.service';

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
    private productsService: ProductsService) { }

  private sendQuery(id: number): void {
    this.product = this.productsService.GetProductById(id);
    
  }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];
    this.sendQuery(this.Id);
  }

}
