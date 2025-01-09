import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductType } from '../shared/types/card-products.types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @Input() quantityOnCart: number = 0;
  @Output() buttonCartClicked:  EventEmitter<boolean> = new EventEmitter<boolean>();

  emitCardClicked(){
    this.buttonCartClicked.emit(true)
  }
}
