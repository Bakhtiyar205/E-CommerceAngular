import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductCreate } from 'src/app/contracts/product_create';
import { __values } from 'tslib';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product_create: ProductCreate, successCallBack?: () => void, errorCallback?: (errorMessage?: string) => void) {
    this.httpClientService.post({
      controller: "product"
    },product_create).subscribe( result => {
          successCallBack!();
        }, (errorResponse: HttpErrorResponse)=>{
          const _error : Array<{key: string, value: Array<string>}> = errorResponse.error;
          let message = "";
          _error.forEach((e,index)=>{
            e.value.forEach((_v, _index)=>{
              message += `${_v}<br>`;
            })
          })
          errorCallback!(message);
    })
  }

  async read(page: number = 0, size: number = 5,successCallBack? : () => void, errorCallback?: (errorMessage : string) => void) : Promise<{totalCount: number, products: List_Product[]} | undefined>{
    const promiseData: Promise<{totalCount: number, products: List_Product[]} | undefined> = this.httpClientService.get<{totalCount: number, products: List_Product[]}>({
      controller: "product",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then( d => successCallBack!())
      .catch(
        (errorResponse: HttpErrorResponse) => errorCallback!(errorResponse.message)
      )

      return promiseData;
  }
  async delete(id: string){
   const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller:"product"
    }, id);

    await firstValueFrom(deleteObservable);

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