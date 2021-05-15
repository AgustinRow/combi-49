import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Parada } from 'src/app/module/parada.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-parada-nuevo',
  templateUrl: './parada-nuevo.component.html',
  styleUrls: ['./parada-nuevo.component.css']
})
export class ParadaNuevoComponent implements OnInit {
  @Input() paradaNueva = new Parada();
  @Input() listCiudades: Ciudad[];
  @Output() paradaNewEvent = new EventEmitter<Parada>();
  submitted = false;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listCiudades = this.mockService.lCiudades;
    console.log(this.listCiudades);
  }

  newStop(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.submitted = true;
      this.paradaNewEvent.emit(this.paradaNueva);
    }
  }
}
