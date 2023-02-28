import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

//Components
import {BaseComponent, SpinnerType} from "src/app/base/base.component"

//Service and Models
import { ProductCreate } from 'src/app/contracts/product_create';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadComponent, FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
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



  @Output() createdProduct: EventEmitter<ProductCreate> = new EventEmitter();
  @Output()fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "product",
    explanation: "Choose the images",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg"
  };

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom)
    const create_product = new ProductCreate();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value);
    create_product.stock = parseInt(stock.value);


    if(!name.value){
      this.alertify.message("Please add product name",{
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.BottomRight
      })
      return
    }

    if(parseInt(stock.value)<0){
      this.alertify.message("Please add positive number",{
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.BottomRight
      })
      return

    }

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Product is added",{
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.BottomRight
      })

    }, (errorMessage: any) => {
      this.alertify.message(errorMessage,{
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    });

    this.createdProduct.emit(create_product);
  }
}
