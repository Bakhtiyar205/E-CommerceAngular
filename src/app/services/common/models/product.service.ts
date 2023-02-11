import { Injectable } from '@angular/core';
import { ProductCreate } from 'src/app/contracts/product_create';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product_create: ProductCreate, successCallBack?: any) {
    this.httpClientService.post({
      controller: "product"
    },product_create).subscribe( result => {
      successCallBack();
    })
  }
}
