import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GoogleMapModule } from 'src/app/shared/components/google-map/google-map.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    GoogleMapModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
