import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/interfaces/categories.interfaces';
import { IProductParams } from 'src/app/interfaces/params.interfaces';
import { IProduct, IProductDTO } from 'src/app/interfaces/products.interfaces';
import { IProvider } from 'src/app/interfaces/providers.interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public categories$: Observable<ICategory[]> | undefined;
  public providers$: Observable<IProvider[]> | undefined;
  public products: IProduct[] = [];

  public addForm: FormGroup = new FormGroup({});
  public updateForm: FormGroup = new FormGroup({});
  public deleteForm: FormGroup = new FormGroup({});

  public submitted = false;
  public message: string = '';

  public params: IProductParams = {
    SearchTerm: '',
    Currency: 'EUR',
    OrderBy: '',
    CategoryId: 0,
    ProviderId: 0,
    PageNumber: 1,
    PageSize: 4
  }

  constructor(
    private productsService: ProductsService,
    private providersService: ProvidersService,
    private categoriesServie: CategoriesService,
    private paginationService: PaginationService) { }

  public sendQuery(): void {
    this.params.PageNumber = this.paginationService.metaData.CurrentPage;
    this.productsService.GetAllProducts(this.params).subscribe(data => {
      this.products = data.body;
      this.paginationService.metaData = JSON.parse(data.headers.get('pagination'));
    });
  }
  
  ngOnInit(): void {
    this.paginationService.metaData.CurrentPage = 1;
    this.sendQuery();
    this.providers$ = this.providersService.GetProviders();
    this.categories$ = this.categoriesServie.GetCategories();
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      cost: new FormControl('', [Validators.required]),
      description: new FormControl(),
      imagepath: new FormControl(),
      categoryid: new FormControl('', [Validators.required]),
      providerid: new FormControl('', [Validators.required]),
    });
    this.updateForm = new FormGroup({
      oldname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      oldcost: new FormControl('', [Validators.required]),
      olddescription: new FormControl(),
      oldimagepath: new FormControl(),
      oldcategoryid: new FormControl('', [Validators.required]),
      oldproviderid: new FormControl('', [Validators.required]),
      updateid: new FormControl()
    });
    this.deleteForm = new FormGroup({
      deleteid: new FormControl()
    });
  }

  public search(): void {
    this.params.SearchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    this.sendQuery();
  }

  public currencyChange(): void {
    this.params.Currency = (<HTMLInputElement>document.getElementById('currency')).value;
    this.sendQuery();
  }

  public order(): void {
    this.params.OrderBy = (<HTMLInputElement>document.getElementById('order')).value;
    this.sendQuery();
  }

  public setCategory(): void {
    this.params.CategoryId = Number((<HTMLInputElement>document.getElementById('category')).value);
    this.sendQuery();
  }

  public setProvider(): void {
    this.params.ProviderId = Number((<HTMLInputElement>document.getElementById('provider')).value);
    this.sendQuery();
  }

  public putDataToUpdate(product: IProduct): void {
    this.updateForm.controls['oldname'].setValue(product.Name);
    this.updateForm.controls['oldcost'].setValue(product.Cost);
    this.updateForm.controls['olddescription'].setValue(product.Description);
    //this.updateForm.controls['oldcategoryid'].setValue(product.Category);
    //this.updateForm.controls['oldproviderid'].setValue(product.Provider);
    this.updateForm.controls['updateid'].setValue(product.Id);
  }

  public putDataToDelete(product: IProduct): void {
    this.deleteForm.controls['deleteid'].setValue(product.Id);
  }

  public updateItem(): void {
    if (this.updateForm.invalid) return;
    
    this.submitted = true;

    
    const product: IProductDTO = {
      Name: this.updateForm.value.oldname,
      Id: this.updateForm.value.updateid,
      Cost: this.updateForm.value.oldcost,
      ImagePath: this.updateForm.value.oldimagepath,
      Description: this.updateForm.value.olddescription,
      CategoryId: this.updateForm.value.oldcategoryid,
      ProviderId: this.updateForm.value.oldproviderid
    };
    this.productsService.UpdateProduct(product).subscribe();
    
  }

  public deleteItem(): void {
    if (this.deleteForm.invalid) return;
    
    this.submitted = true;
    this.productsService.DeleteProduct(this.deleteForm.value.deleteid).subscribe();
  }

  public addItem(): void {
    if (this.addForm.invalid) return;
    
    this.submitted = true;

    const product: IProductDTO = {
      Name: this.addForm.value.name,
      Id: this.addForm.value.updateid,
      Description: this.addForm.value.description,
      ImagePath: this.updateForm.value.imagepath,
      Cost: this.addForm.value.cost,
      CategoryId: this.addForm.value.categoryid,
      ProviderId: this.addForm.value.providerid
    };
    this.productsService.AddProduct(product).subscribe();
  }
}
