import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Provincia } from 'src/app/module/provincia.module';

@Component({
  selector: 'app-provincia-editar',
  templateUrl: './provincia-editar.component.html',
  styleUrls: ['./provincia-editar.component.css']
})
export class ProvinciaEditarComponent implements OnInit {
  @Input() provinciaModificada = new Provincia();
  @Output() provEditEvent = new EventEmitter();
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  modifyProv(formulario: NgForm) {
    if (formulario.valid) {
      this.provEditEvent.emit();
      this.submitted = true;
    }
  }
}
