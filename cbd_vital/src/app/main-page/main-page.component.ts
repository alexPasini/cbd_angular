import { Component } from '@angular/core';
// import { ButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../components/header/header.component';
import { FeaturesComponent } from '../components/features/features.component';
import { HowToBuyComponent } from '../components/how-to-buy/how-to-buy.component';
import { FeedbacksComponent } from '../components/feedbacks/feedbacks.component';
import { InfosComponent } from '../components/infos/infos.component';
import { BeneficiosComponent } from "../components/beneficios/beneficios.component";

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    // ButtonModule,
    HeaderComponent,
    FeaturesComponent,
    HowToBuyComponent,
    // FeedbacksComponent,
    InfosComponent,
    InfosComponent,
    BeneficiosComponent
],
  templateUrl: './main-page.component.html',
  standalone: true,
})
export class MainPageComponent {}
