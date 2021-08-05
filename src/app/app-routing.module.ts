import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CategoriesComponent } from './pages/management/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ManagementComponent } from './pages/management/management.component';
import { ProductsComponent } from './pages/management/products/products.component';
import { ProvidersComponent } from './pages/management/providers/providers.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AccountGuard } from './services/account.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { CatalogItemDetailComponent } from './pages/catalog/catalog-item-detail/catalog-item-detail.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { 
    path: "catalog", component: CatalogComponent, 
    children: [ 
      { path: "item-detail/:id", component: CatalogItemDetailComponent } 
    ] 
  },
  { path: "profile", component: ProfileComponent, canActivate: [AccountGuard] },
  { 
    path: "management", 
    component: ManagementComponent, 
    children: [
      { path: "providers", component: ProvidersComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "products", component: ProductsComponent },
    ], 
    canActivate: [AccountGuard] 
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
