import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Provincia } from 'src/app/module/provincia.module';

@Component({
  selector: 'app-provincia-nuevo',
  templateUrl: './provincia-nuevo.component.html',
  styleUrls: ['./provincia-nuevo.component.css']
})
export class ProvinciaNuevoComponent implements OnInit {
  @Input() provinciaNueva = new Provincia();
  @Output() provinciaNewEvent = new EventEmitter<Provincia>();
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  newProv(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.submitted = true;
      this.provinciaNewEvent.emit(this.provinciaNueva);
    }
  }

}
