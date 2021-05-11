import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Provincia } from 'src/app/module/provincia.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-ciudad-nuevo',
  templateUrl: './ciudad-nuevo.component.html',
  styleUrls: ['./ciudad-nuevo.component.css']
})
export class CiudadNuevoComponent implements OnInit {
  @Input() ciudadNueva = new Ciudad();
  @Input() listProvincias: Provincia[];
  @Output() ciudadNewEvent = new EventEmitter<Ciudad>();
  submitted = false;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listProvincias = this.mockService.lProvincia;
    console.log(this.listProvincias);
  }

  newCity(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.submitted = true;
      this.ciudadNewEvent.emit(this.ciudadNueva);
    }
  }
}
