import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent, FileUploadState} from 'src/app/dialogs/file-upload-dialog/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpCustomService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToasterService: CustomToastrService,
    private dialog: MatDialog
  ) {

  }
  public files: NgxFileDropEntry[] = [];

  @Input() options: Partial<FileUploadOptions> | undefined;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      })
    }

    this.openDialog(()=>{
      
    })

    this.httpCustomService.post({
      controller: this.options?.controller,
      action: this.options?.action,
      queryString: this.options?.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(data => {

      const message: string = "Datas uploaded successfully"

      if (this.options?.isAdminPage) {
        this.alertifyService.message(message,{
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      } else {
        this.customToasterService.message(message,"Succesfully",{
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        })
      }
    }, (errorResponse: HttpErrorResponse) => {
      const message: string = "Error happend while uploading the datas"

      if (this.options?.isAdminPage) {
        this.alertifyService.message(message,{
          dismissOthers: true,
          messageType: MessageType.Warning,
          position: Position.TopRight
        })
      } else {
        this.customToasterService.message(message,"Error",{
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight
        })
      }
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width:'250px',
      data: FileUploadState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == FileUploadState.Yes){
        afterClosed();
      }
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
} 
