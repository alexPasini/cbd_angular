import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../components/header/header.component';
import { FeaturesComponent } from '../components/features/features.component';
import { AboutComponent } from '../components/about/about.component';
import { HowItWorksComponent } from '../components/how-it-works/how-it-works.component';
import { TestimonialsComponent } from '../components/testimonials/testimonials.component';
import { ContactComponent } from '../components/contact/contact.component';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, ButtonModule, HeaderComponent, FeaturesComponent, AboutComponent, HowItWorksComponent, TestimonialsComponent, ContactComponent],
  templateUrl: './main-page.component.html',
  standalone:true

})
export class MainPageComponent {

}
