import { Component } from '@angular/core';

import { SendWhats } from '../../shared/send_mesage';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [],
  templateUrl: './infos.component.html',
})
export class InfosComponent {
  constructor() {
  }
  sendMensage() {
    const sendWhats = new SendWhats()
    sendWhats.sendMensage()
  }
}
