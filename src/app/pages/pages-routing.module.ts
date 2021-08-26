import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../services/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemDetailComponent } from './catalog/catalog-item-detail/catalog-item-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './basket/basket.component';
import { ClientGuard } from '../services/guards/client.guard';
import { AdministratorGuard } from '../services/guards/administrator.guard';
import { ManagementComponent } from './management/management.component';
import { ProvidersComponent } from './management/providers/providers.component';
import { CategoriesComponent } from './management/categories/categories.component';
import { ProductsComponent } from './management/products/products.component';
import { AccountService } from '../services/account.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountInterseptor } from '../services/account.interseptor';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "about", component: AboutComponent },
      { path: "privacy", component: PrivacyComponent },
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "catalog", component: CatalogComponent },
      { path: "catalog/item-detail/:id", component: CatalogItemDetailComponent },
      { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
      { path: "basket", component: BasketComponent, canActivate: [AuthGuard, ClientGuard] },
      { 
        path: "management", 
        component: ManagementComponent, 
        children: [
          { path: "providers", component: ProvidersComponent },
          { path: "categories", component: CategoriesComponent },
          { path: "products", component: ProductsComponent },
        ], 
        canActivate: [AuthGuard, AdministratorGuard] 
      },
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    ClientGuard,
    AdministratorGuard,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountInterseptor,
      multi: true
    }
  ]
})
export class PagesRoutingModule { }
