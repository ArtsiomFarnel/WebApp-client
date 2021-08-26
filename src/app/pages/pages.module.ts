import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { AboutModule } from './about/about.module';
import { BasketModule } from './basket/basket.module';
import { CatalogModule } from './catalog/catalog.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ManagementModule } from './management/management.module';
import { PrivacyModule } from './privacy/privacy.module';
import { ProfileModule } from './profile/profile.module';
import { SignupModule } from './signup/signup.module';
import { LoadingModule } from '../layouts/loading/loading.module';
import { PaginationModule } from '../layouts/pagination/pagination.module';
import { NotificationModule } from '../layouts/notification/notification.module';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomeModule,
    LoginModule,
    SignupModule,
    CatalogModule,
    ManagementModule,
    ProfileModule,
    AboutModule,
    PrivacyModule,
    BasketModule,
    LoadingModule,
    PaginationModule,
    NotificationModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
