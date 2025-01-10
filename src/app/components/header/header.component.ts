import { Component } from '@angular/core';

import { SendWhats } from '../../shared/send_mesage';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor() {
  }
  sendMensage() {
    const sendWhats = new SendWhats()
    sendWhats.sendMensage()
  }
}
