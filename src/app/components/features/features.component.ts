import { Component } from '@angular/core';
import { SendWhats } from '../../shared/send_mesage';
@Component({
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',

})
export class FeaturesComponent {
  constructor() {
  }
  sendMensage() {
    const sendWhats = new SendWhats()
    sendWhats.sendMensage()
  }
}
