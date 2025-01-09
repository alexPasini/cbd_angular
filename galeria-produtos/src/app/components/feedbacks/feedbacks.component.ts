import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports : [CommonModule],
  templateUrl: './feedbacks.component.html',

})
export class FeedbacksComponent {
  feedbacks = [
    {
      name: 'Laércio da Costa',
      message:
        'Tenho diabetes tipo 2 e o óleo de CBD, com auxílio de um médico, me ajudou muito, pois as dores eram terríveis.',
      image: 'assets/media/user1.jpg',
      isActive: false,
    },
    {
      name: 'Fernanda Silva',
      message:
        'Minha mãe tem enxaqueca, e decidimos fazer o uso do óleo de CBD. As crises diminuíram e a intensidade delas também.',
      image: 'assets/media/user2.jpg',
      isActive: true,
    },
    {
      name: 'João Oliveira',
      message:
        'O óleo de CBD foi um divisor de águas na minha qualidade de vida. Sinto-me muito mais disposto e com menos dores.',
      image: 'assets/media/user3.jpg',
      isActive: false,
    },
  ];

  activeIndex = 1;

  get paginationDots() {
    return Array(this.feedbacks.length);
  }

  changeActiveFeedback(index: number) {
    this.activeIndex = index;
    this.feedbacks.forEach((fb, i) => (fb.isActive = i === index));
  }
}
