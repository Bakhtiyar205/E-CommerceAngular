import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertify: AlertifyService){}

  ngOnInit(): void {
    
  }

  notify(){
    this.alertify.message("Hello", {
      messageType: MessageType.Error,
      position: Position.TopCenter,
      delay: 0,
      dismissOthers: false
    });
  }

  dismissNotify(){
    this.alertify.dismissAll();
  }
}
