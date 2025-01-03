import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-testimonials',
  imports: [CarouselModule],
  templateUrl: './testimonials.component.html',

})
export class TestimonialsComponent {
  testimonials = [
    { comment: 'Esse produto mudou minha vida!', name: 'João Silva' },
    { comment: 'Excelente qualidade, recomendo.', name: 'Maria Oliveira' },
    { comment: 'Muito eficaz e confiável.', name: 'Carlos Souza' }
  ];
}
