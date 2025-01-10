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
      name: 'Camila R. Bellucci',
      message: '"A pressão da faculdade me levou a desenvolver uma ansiedade difícil de controlar, era como se eu não pudesse relaxar. Depois que comecei a usar o óleo da CBD Vital Med, consegui me sentir mais tranquila e focada. Minhas noites de sono também melhoraram muito. É incrível como algo tão simples pode fazer tanta diferença."',
      image: '../../../assets/media/ampola.svg'
    },
    {
      name: 'Rafaela M. Schneider',
      message: '"Perder minha mãe foi o momento mais doloroso da minha vida, e isso me levou a uma tristeza constante. Eu não tinha energia para nada, nem mesmo para cuidar de mim. O óleo da CBD Vital Med foi essencial para virar essa página. Ele me ajudou a retomar o equilíbrio emocional e trouxe de volta a disposição para seguir em frente."',
      image: '../../../assets/media/ampola.svg'
    },
    {
      name: 'Giovanna T. Goulart',
      message: '"Minha insônia estava ligada ao meu estilo de vida sedentário. Era difícil dormir e ainda mais complicado acordar com energia. Desde que comecei a usar o óleo da CBD Vital Med, senti mudanças em várias áreas. Meu sono melhorou muito e, com mais disposição, consegui voltar a me exercitar. Foi um ciclo positivo que começou com o óleo."',
     image: '../../../assets/media/ampola.svg'
    },
    {
      name: 'Renato L. Kowalski',
      message: '"Trabalhei por anos em atividades pesadas e, como resultado, desenvolvi uma hérnia de disco. As dores me acompanhavam o tempo todo, afetando até tarefas simples como caminhar. Com o óleo da CBD Vital Med, finalmente encontrei o alívio que precisava. Ele me devolveu a liberdade de fazer o que gosto, sem o sofrimento constante."',
     image: '../../../assets/media/ampola.svg'
    },
    {
      name: 'Antonio C. Oliveira ',
      message: '"Desde pequeno, enfrento crises epilépticas que limitaram minha vida de muitas formas. Foram décadas lidando com isso, até que, aos 40 anos, comecei a usar o óleo da CBD Vital Med. As crises diminuíram tanto que hoje posso levar uma vida muito mais tranquila e sem aquele medo constante. É um alívio que eu não sabia que era possível."',
     image: '../../../assets/media/ampola.svg'
    }
  ];
}
