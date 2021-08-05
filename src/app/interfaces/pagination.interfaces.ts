export interface Pagination {
  CurrentPage: number;
  HasNext: boolean;
  HasPrevious: boolean;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
}