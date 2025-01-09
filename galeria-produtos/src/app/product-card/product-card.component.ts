import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductType, ProductTypeSelected} from "../shared/types/card-products.types"
import { GalleriaModule } from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ButtonModule,CommonModule,GalleriaModule,DropdownModule,FormsModule,ToastModule],
  templateUrl: './product-card.component.html',
  providers:[MessageService]

})
export class ProductCardComponent {

  selectedSize:{label:string,value:string} ={label:"",value:""}
  sizeOptions =[
    {label:"P",value:"P"},
    {label:"M",value:"M"},
    {label:"G",value:"G"},
    {label:"GG",value:"GG"},
  ]
  @Input() product:ProductType | null =null

  @Output() productAdded: EventEmitter<ProductTypeSelected> = new EventEmitter<ProductTypeSelected>();

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  constructor(private messageService: MessageService){}

  onAddProduct(product:ProductType){
    //console.log(product.name)
  }

  get addButtonActive(){
    if(this.selectedSize){
      return true
    }
    return false
  }

  onAddToCartClick() {

    if (this.product && this.selectedSize.label) {
      const productSelected: ProductTypeSelected = { ...this.product, size: this.selectedSize.label };
      this.productAdded.emit(productSelected);
    }

    if (!this.selectedSize.label){
      this.show()
    }
  }


  show() {
    this.messageService.add({ severity: 'error', summary: '', detail: 'Escolha o tamnho antes de adicionar' });
}


}
