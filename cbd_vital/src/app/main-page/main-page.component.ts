import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../components/header/header.component';
import { FeaturesComponent } from '../components/features/features.component';
import { HowToBuyComponent } from '../how-to-buy/how-to-buy.component';
import { FeedbacksComponent } from '../feedbacks/feedbacks.component';




@Component({
  selector: 'app-main-page',
  imports: [CommonModule, ButtonModule, HeaderComponent, FeaturesComponent, HowToBuyComponent, FeedbacksComponent ],
  templateUrl: './main-page.component.html',
  standalone:true

})
export class MainPageComponent {

}
