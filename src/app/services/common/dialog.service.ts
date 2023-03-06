import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogParameters : Partial<DialogParameters>) {
    if(dialogParameters.componentType != undefined){
      const dialogRef = this.dialog.open(dialogParameters.componentType, {
        width: dialogParameters.options?.width,
        height: dialogParameters.options?.height,
        position: dialogParameters.options?.position,
        data: dialogParameters.data,
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if(result == dialogParameters.data){
          dialogParameters.afterClosed!()
        }
      });
    }

  }
}

export class DialogParameters {
  componentType: ComponentType<any> | undefined;
  data: any;
  afterClosed: (() => void) | undefined; 
  options?: Partial<DialogOptions>
}

export class DialogOptions {
  width?: string = '250px';
  height?: string;
  position?: DialogPosition
}
