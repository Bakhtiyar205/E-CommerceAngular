import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog/file-upload-dialog.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ], exports:[
    DeleteDialogComponent,
    FileUploadDialogComponent
  ]
})
export class DialogModule { }
