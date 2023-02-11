import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

//Components
import {BaseComponent, SpinnerType} from "src/app/base/base.component"

//Service and Models
import { ProductCreate } from 'src/app/contracts/product_create';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService,private productService: ProductService, private alertify: AlertifyService){
    super(spinner)
  }

  ngOnInit(): void {
    
  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom)
    const create_product = new ProductCreate();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value);
    create_product.stock = parseInt(stock.value)
    
    
    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Product is added",{
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.BottomRight
      })

    });
  }
}
