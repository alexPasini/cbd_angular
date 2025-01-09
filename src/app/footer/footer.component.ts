import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductType } from '../shared/types/card-products.types';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  @Input() quantityOnCart: number = 0;
  @Output() buttonCartClicked:  EventEmitter<boolean> = new EventEmitter<boolean>();

  emitCardClicked(){
    this.buttonCartClicked.emit(true)
  }
}
