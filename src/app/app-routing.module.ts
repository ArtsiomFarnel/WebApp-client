import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ManagementComponent } from './pages/management/management.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services/account.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
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
  {
    path: "management",
    component: ManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin",
    loadChildren: () => import("./pages/pages-routing.module").then(p => p.PagesRoutingModule)
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
