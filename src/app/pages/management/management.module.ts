import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProductsComponent } from './products/products.component';
import { PaginationModule } from 'src/app/layouts/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ManagementComponent,
    CategoriesComponent,
    ProvidersComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ManagementComponent,
    CategoriesComponent,
    ProvidersComponent,
    ProductsComponent
  ]
})
export class ManagementModule { }
