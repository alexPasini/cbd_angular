import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CartItemType } from '../../types/cart-item.types';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule, SidebarModule, Button],
  templateUrl: './whatsapp-button.component.html',
})
export class WhatsappButtonComponent {

  @Input() items:CartItemType[]=[]



  mesage: string = "Ola, selecionei os seguintes produtos na loja.\n\n*Produto 1*: nome\n";

  constructor() {

  }




  formatMasage(){
    let initiaMesage = 'Ola, selecionei os seguintes produtos na loja.\n'
    let itemsMesage=''
    let totalPrice=0

    for(let i =0;i<this.items.length;i++ ){
      const item = this.items[i]
      totalPrice+=item.quantity*item.product.price
      let mesage = `
      *Produto ${i+1}*\n
      *ID* ${item.product.id}
      *Quantidade* ${item.quantity}
      *Tamanho* ${item.product.size}
      *Preco Unidade* R$ ${item.product.price}

      ======================
      `
      itemsMesage+=mesage
    }
    let infoMesage = `\n *Total:* R$ ${totalPrice}\n\n`
    let finalMesage = initiaMesage +itemsMesage+infoMesage

    return finalMesage
  }

  sendMensage() {
    // Codifica a mensagem para a URL
    const encodedMessage = encodeURIComponent(this.formatMasage());
    const href = `https://wa.me/+5555999177627?text=${encodedMessage}`;
    console.log(href)

    // Abre o WhatsApp em uma nova aba
    window.open(href, "_blank");
  }
}
