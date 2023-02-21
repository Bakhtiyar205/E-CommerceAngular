import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

//Table
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit, AfterViewInit{

constructor(spinner: NgxSpinnerService,private productService: ProductService, private alertify: AlertifyService){
  super(spinner);

}


@ViewChild(MatPaginator, {static: false}) paginator?: MatPaginator;




displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updateDate'];
dataSource : MatTableDataSource<List_Product>= new MatTableDataSource<List_Product>();


async getProducts(){
  this.showSpinner(SpinnerType.BallAtom);
    const allProducts: {totalCount: number, products: List_Product[]} | undefined= await this.productService.read(this.paginator? this.paginator?.pageIndex : 0, this.paginator ? this.paginator?.pageSize : 5,()=> this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
     this.alertify.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
     }));
     this.dataSource = new MatTableDataSource<List_Product>(allProducts?.products);
     if(this.paginator){

     }
    //  this.paginator?.length = allProducts?.totalCount
}

async pageChanged(){
  await this.getProducts();
}



 async ngOnInit(): Promise<void> {
   await this.getProducts(); 
  }


  ngAfterViewInit(): void {
  }


}

