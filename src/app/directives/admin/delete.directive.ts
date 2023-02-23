import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, 
              private _renderer: Renderer2, 
              private productService: ProductService,
              private spinner: NgxSpinnerService) {
                const img = _renderer.createElement("img");
                img.setAttribute("src","../assets/8324271_ui_essential_app_check_delete_icon (1).png");
                img.setAttribute("style","cursor:pointer");
                img.height = 25;
                img.width = 25;
                _renderer.appendChild(element.nativeElement, img);
               }

    @Input() id: string | undefined
    @Output() callBack: EventEmitter<any> = new EventEmitter()

    @HostListener("click")
    async onclick(){
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
        await this.productService.delete(this.id).then(()=>{
          this.spinner.show(SpinnerType.BallAtom).then(()=>{
             this.callBack.emit();
          })
        });
      }

    }      
  }

