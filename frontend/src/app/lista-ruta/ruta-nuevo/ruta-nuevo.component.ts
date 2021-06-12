import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Ruta } from 'src/app/module/ruta.module';
import { CityService } from 'src/app/service/city.service';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-ruta-nuevo',
  templateUrl: './ruta-nuevo.component.html',
  styleUrls: ['./ruta-nuevo.component.css'],
  providers: [
    CityService,
    RouteService
  ]
})
export class RutaNuevoComponent implements OnInit {
  rutaNueva = new Ruta();
  @Input() listCiudades: Ciudad[];
  @Output() rutaNewEvent = new EventEmitter<Ruta>();
  form: FormGroup;

  constructor(
    private cityService: CityService,
    private routeService: RouteService
  ) { }

  ngOnInit(): void {
    this.cityService.getCitys().subscribe(
      (list: any) => {
        this.listCiudades = list.data as Ciudad[];
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert("El servidor reporta estado: " + error.error.message);
        }
      }
    )
    
    this.form = new FormGroup({
      'nombre': new FormControl({}),
      'distancia': new FormControl({}),
      'origen': new FormControl({}),
      'destino': new FormControl({})
    });
  }

  newRoute() {
    if(this.form.valid) 
    {
      this.rutaNueva.Origen = this.listCiudades[this.form.value.Origen];
      this.rutaNueva.Destino = this.listCiudades[this.form.value.Destino];
      this.routeService.addRoute(this.rutaNueva).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha creado la ruta correctamente");
            this.rutaNewEvent.emit(data.data);
          }
        },
        (error) => {
          if (error.status >= 500) {
            alert("Problemas para conectarse con el servidor");
          }
          else {
            alert("El servidor reporta estado: " + error.error.message);
          }
        }
      );
    }
  }
}
