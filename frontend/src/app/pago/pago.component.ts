import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  @Output() payEvent = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.closeEvent.emit();
  }

  payment(){
    var isComplete = ( Math.random() > 0.2 );
    this.payEvent.emit(isComplete);
  }

}
