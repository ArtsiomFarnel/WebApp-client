import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from './google-map.component';
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [GoogleMapComponent],
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  exports: [GoogleMapComponent]
})
export class GoogleMapModule { }
