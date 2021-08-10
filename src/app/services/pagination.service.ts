import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pagination } from "../interfaces/pagination.interfaces";

@Injectable({providedIn: 'root'})
export class PaginationService {

  constructor(private http: HttpClient) { }  
  
  public metaData: Pagination = {
    TotalPages: 0,
    TotalCount: 0,
    PageSize: 0,
    HasNext: false,
    HasPrevious: false,
    CurrentPage: 1
  };
  
  public countPage(currentPage: number): void {
    //if(currentPage > 3) this.countNumPage = 3;
    //else this.countNumPage = currentPage;
  }  
  public changePage(num: number): void{
    this.countPage(this.metaData.CurrentPage);
    if((this.metaData.CurrentPage  + num) <= this.metaData.TotalPages && (this.metaData.CurrentPage + num) >= 1 )
    this.metaData.CurrentPage = this.metaData.CurrentPage + num;
  };
}