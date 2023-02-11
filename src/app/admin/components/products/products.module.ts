import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Components
import { ProductsComponent } from './products.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

//Material UI Imports
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'





@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: ProductsComponent}
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
