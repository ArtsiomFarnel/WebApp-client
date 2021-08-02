import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ManagementComponent } from './management/management.component';



@NgModule({
  declarations: [
    PagesComponent,
    ManagementComponent
  ],
  imports: [
    PagesRoutingModule
  ],
  providers: []
})
export class PagesModule { }
