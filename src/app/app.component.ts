import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from './services/ui/custom-toastr.service';
// declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-CommerceAngular';
  constructor(private toastr: CustomToastrService){
    toastr.message("Helle","Salam",{
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomCenter
    });
  }
}
// $(document).ready(()=>{
//   alert("salam")
// })
