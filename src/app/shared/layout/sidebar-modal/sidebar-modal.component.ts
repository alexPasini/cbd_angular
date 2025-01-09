import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import {SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar-modal',
  standalone: true,
  imports: [CommonModule,SidebarModule,Button],
  templateUrl: './sidebar-modal.component.html',

})
export class SideBarModalComponent {

  @Input() sidebarVisible:boolean=false
  @Input() titleText:string =''
  @Output() closedClick = new EventEmitter<void>();

  constructor() {
    this.sidebarVisible=true
  }

  onClosed(){

    this.sidebarVisible=false
    this.closedClick.emit()
    //console.log("passei")
  }

}
