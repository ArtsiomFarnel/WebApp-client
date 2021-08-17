export interface ICommonParams {
  SearchTerm?: string,
  PageNumber: number,
  PageSize?: number,
  OrderBy?: string,
}

export interface IProductParams extends ICommonParams {
  Fields?: string,
  Currency?: string,
  CategoryId: number,
  ProviderId: number,
  MinCost?: number,
  MaxCost?: number,
}

export interface IProviderParams extends ICommonParams {
  Fields?: string
}

export interface ICategoryParams extends ICommonParams {
  Fields?: string
}

export interface IBasketParams extends ICommonParams {
    Fields?: string
  }