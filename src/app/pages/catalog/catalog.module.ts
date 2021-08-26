import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CatalogItemDetailComponent } from './catalog-item-detail/catalog-item-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/layouts/pagination/pagination.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CatalogComponent,
    CatalogItemDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    RouterModule
  ],
  exports: [
    CatalogComponent,
    CatalogItemDetailComponent
  ]
})
export class CatalogModule { }
