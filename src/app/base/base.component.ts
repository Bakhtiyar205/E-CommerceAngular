import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {

  constructor(private spinner: NgxSpinnerService){

  }

  showSpinner(name: SpinnerType){
    this.spinner.show(name);

    setTimeout(()=>{
      this.hideSpinner(name)
    },1000)
  }

  hideSpinner(name: SpinnerType){
    this.spinner.hide(name)
  }

}


export enum SpinnerType{

  BallAtom = "spinnerOne",
  BallScale = "spinnerTwo",
  BallSpinClockwiseFadeRoatting = "spinnerThree"
}
