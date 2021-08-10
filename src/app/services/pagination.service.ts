import { Injectable } from "@angular/core";
import { Pagination } from "../interfaces/pagination.interfaces";

@Injectable({providedIn: 'root'})
export class PaginationService {

  constructor() { }  

  public metaData: Pagination = {
    TotalPages: 0,
    TotalCount: 0,
    PageSize: 0,
    HasNext: false,
    HasPrevious: false,
    CurrentPage: 1
  };

  public changePage(num: number): void {
    if((this.metaData.CurrentPage + num) <= this.metaData.TotalPages && (this.metaData.CurrentPage + num) >= 1 )
      this.metaData.CurrentPage = this.metaData.CurrentPage + num;
  };
}