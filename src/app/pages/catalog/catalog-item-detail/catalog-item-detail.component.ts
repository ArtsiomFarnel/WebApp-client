import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-item-detail',
  templateUrl: './catalog-item-detail.component.html',
  styleUrls: ['./catalog-item-detail.component.css']
})
export class CatalogItemDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("!")
  }

}
