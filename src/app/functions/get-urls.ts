import { IProductParams, ICategoryParams, IProviderParams } from "../interfaces/params.interfaces";

export function getProductsUrl(pathBase: string, params: IProductParams | undefined): string {
  let url = `${pathBase}?`;
  for (let key in params) {
    if (params[key as keyof IProductParams]) {
      url = `${url}${key}=${params[key as keyof IProductParams]}&`;
    }
  }
  return url;
}

export function getCategoriesUrl(pathBase: string, params: ICategoryParams | undefined): string {
  let url = `${pathBase}?`;
  for (let key in params) {
    if (params[key as keyof ICategoryParams]) {
      url = `${url}${key}=${params[key as keyof ICategoryParams]}&`;
    }
  }
  return url;
}

export function getProvidersUrl(pathBase: string, params: IProviderParams | undefined): string {
  let url = `${pathBase}?`;
  for (let key in params) {
    if (params[key as keyof IProviderParams]) {
      url = `${url}${key}=${params[key as keyof IProviderParams]}&`;
    }
  }
  return url;
}