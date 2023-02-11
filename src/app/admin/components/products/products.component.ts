import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductCreate } from 'src/app/contracts/product_create';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService){
    super(spinner);
  }
  
  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallAtom);
    // this.httpClientService.get<ProductCreate[]>({
    //   controller: "product"
    // }).subscribe(data => console.log(data));

    // this.httpClientService.post({
    //   controller: "ProductCreate"
    // }, {
    //   name: "Paper",
    //   stock: 1000,
    //   price: 20
    // }).subscribe();

    // this.httpClientService.post({
    //   controller: "ProductCreate"
    // }, {
    //   name: "Pencil",
    //   stock: 500,
    //   price: 12
    // }).subscribe();

    // this.httpClientService.post({
    //   controller: "ProductCreate"
    // }, {
    //   name: "Workpaper",
    //   stock: 40,
    //   price: 12
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "product"
    // },{
    //   id: "7a4c959d-d3e2-49f9-9712-08db0c651854",
    //   name: "Colored Paper",
    //   stock: 200,
    //   price: 10
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: "product"
    // },"7a4c959d-d3e2-49f9-9712-08db0c651854").subscribe();
  }
}
