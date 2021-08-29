import { Component, OnInit } from '@angular/core';
import { google } from "google-maps";

declare var google : google;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
