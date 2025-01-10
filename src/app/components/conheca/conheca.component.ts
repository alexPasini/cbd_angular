import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SendWhats } from '../../shared/send_mesage';
@Component({
  selector: 'app-conheca',
  standalone: true,
  imports: [AccordionModule],
  templateUrl: './conheca.component.html',

})
export class ConhecaComponent {
  constructor() {
  }
  sendMensage() {
    const sendWhats = new SendWhats()
    sendWhats.sendMensage()
  }
}
