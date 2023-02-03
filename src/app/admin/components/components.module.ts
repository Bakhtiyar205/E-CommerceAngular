import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomerModule } from './customer/customer.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    OrderModule,
    DashboardModule,
    CustomerModule
  ],
  exports:[
    ProductsModule,
    OrderModule,
    CustomerModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
