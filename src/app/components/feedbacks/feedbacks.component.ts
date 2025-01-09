import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './feedbacks.component.html',

})
export class FeedbacksComponent {
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];


  feedbacks = [
    {
      name: 'Laércio da Costa',
      message: 'Tenho diabetes tipo 2 e o óleo de CBD, com auxílio de um médico, me ajudou muito, pois as dores eram terríveis.',
      image: '../../../assets/media/ampola.svg'
    },
    {
      name: 'Fernanda Silva',
      message: 'Minha mãe tem enxaqueca, e decidimos fazer o uso do óleo de CBD. As crises diminuíram e a intensidade delas também.',
      image: '../../../assets/media/ampola.svg'
    },
    {
      name: 'Carlos Santos',
      message: 'Com o uso do óleo, notei uma melhora significativa no meu sono e redução da ansiedade.',
     image: '../../../assets/media/ampola.svg'
    }
  ];
}
