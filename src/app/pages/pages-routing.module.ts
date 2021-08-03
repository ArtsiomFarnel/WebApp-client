import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ProvidersComponent } from './providers/providers.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: "providers",
    component: ProvidersComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "products",
    component: ProductsComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PagesRoutingModule { }
