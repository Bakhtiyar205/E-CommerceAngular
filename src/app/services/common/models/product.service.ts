import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCreate } from 'src/app/contracts/product_create';
import { __values } from 'tslib';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product_create: ProductCreate, successCallBack?: any, errorCallback? : any) {
    this.httpClientService.post({
      controller: "product"
    },product_create).subscribe( result => {
          successCallBack();
        }, (errorResponse: HttpErrorResponse)=>{
          const _error : Array<{key: string, value: Array<string>}> = errorResponse.error;
          let message = "";
          _error.forEach((e,index)=>{
            e.value.forEach((_v, _index)=>{
              message += `${_v}<br>`;
            })
          })
          errorCallback(message);
    })
  }
}



// (errorResponse: HttpErrorResponse)=>{
//   const _error : Array<{key: string, value: Array<string>}> = errorResponse.error;
//   let message = "";
//   _error.forEach((e,index)=>{
//     e.value.forEach((_v, _index)=>{
//       message += `${_v}<br>`;
//     })
//   })
//   errorCallback?(message): undefined;
// }