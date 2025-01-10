import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { CartItemType } from '../../types/cart-item.types';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  standalone: true,  // Configurando como standalone
  imports: [CommonModule, ButtonModule,InputNumberModule,FormsModule],  // Importando módulos necessários
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input() cart: CartItemType[] = [];
  @Output() itemRemoved = new EventEmitter<CartItemType>();

  removeItem(item: CartItemType) {
    this.itemRemoved.emit(item);
  }

  findCartItem(item:CartItemType){
    return this.cart.find(item_element=> item_element.product.id==item.product.id )
  }

  mudanca(item:CartItemType){
    console.log(item)
  }

  onQuantityChange(event:any,item:CartItemType){
    item.quantity = item.quantity >0? item.quantity : 1

    let itemFinded = this.findCartItem(item)
    if (itemFinded){

      itemFinded.quantity=item.quantity
    }
    return itemFinded
  }
}
