import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPagination } from 'src/app/interfaces/pagination.interfaces';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() metaData: IPagination = {
    TotalPages: 0,
    TotalCount: 0,
    PageSize: 0,
    HasNext: false,
    HasPrevious: false,
    CurrentPage: 1
  };
  @Input() isActive: boolean = true;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public setPage(num: number): void {
    if (!this.isActive) return;
    if ((this.metaData.CurrentPage + num) <= this.metaData.TotalPages && (this.metaData.CurrentPage + num) >= 1 ) {
      this.metaData.CurrentPage = this.metaData.CurrentPage + num;
      this.changePage.emit(this.metaData.CurrentPage);
    }
  };

  public setFirst(): void {
    if (this.metaData.CurrentPage == 1) return;
    this.metaData.CurrentPage = 1;
    this.changePage.emit(this.metaData.CurrentPage);
  }

  public setLast(): void {
    if (this.metaData.CurrentPage == this.metaData.TotalPages) return;
    this.metaData.CurrentPage = this.metaData.TotalPages;
    this.changePage.emit(this.metaData.CurrentPage);
  }
}
