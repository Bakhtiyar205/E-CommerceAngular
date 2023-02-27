import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, 
              private _renderer: Renderer2, 
              private httpClientService: HttpClientService,
              private spinner: NgxSpinnerService,
              public dialog: MatDialog,
              private alertify: AlertifyService) {
                const img = _renderer.createElement("img");
                img.setAttribute("src","../assets/8324271_ui_essential_app_check_delete_icon (1).png");
                img.setAttribute("style","cursor:pointer");
                img.height = 25;
                img.width = 25;
                _renderer.appendChild(element.nativeElement, img);
               }

    @Input() id: string | undefined;
    @Input() controller: string | undefined;
    @Output() callBack: EventEmitter<any> = new EventEmitter()

    @HostListener("click")
    async onclick(){
        this.openDialog(async ()=> {
          if(this.id){
            const td: HTMLTableCellElement = this.element.nativeElement.parentElement;
            const fadeEffect = setInterval(()=>{
                if(!td.style.opacity){
                  td.style.opacity = '1';
                }if(td.style.opacity>'0'){
                  td.style.opacity = "0"
                }else{
                  clearInterval(fadeEffect);
                }
            }, 200)
    
            this.spinner.show(SpinnerType.BallAtom)
            await this.httpClientService.delete({
              controller: this.controller
            }, this.id).subscribe(()=>{
              this.spinner.show(SpinnerType.BallAtom)
            }, ()=>{
              this.callBack.emit();
              this.alertify.message("Product is deleted succesfully.",{
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              })
            }),(errorResponse: HttpErrorResponse)=>{
              this.spinner.hide();
              this.alertify.message("There is something wrong",{
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              })
          }
        }
      })
    }  
    
    openDialog(afterClosed: any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width:'250px',
        data: DeleteState.Yes,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == DeleteState.Yes){
          afterClosed();
        }
      });
    }
  }

