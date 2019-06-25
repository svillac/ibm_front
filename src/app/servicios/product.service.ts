import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { AppConstant } from '../util/AppConstant'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public static productSelected:Product;
  baseUrl:string = AppConstant.URL_BASE;

  constructor(private http: HttpClient) { }

  addProduct(product: Product, cardId : number){
    return this.http.post<Product>(this.baseUrl + 'addProduct/' + cardId, product);
  }

  editProduct(product : Product){
    return this.http.put<Boolean>(this.baseUrl + 'editProduct/', product);
  }

  deleteProduct(productId: number){
    return this.http.delete<boolean>(this.baseUrl + 'deleteProduct/' + productId);
  }
}
