import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Ruta } from 'src/app/module/ruta.module';
import { CityService } from 'src/app/service/city.service';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-ruta-editar',
  templateUrl: './ruta-editar.component.html',
  styleUrls: ['./ruta-editar.component.css'],
  providers: [
    CityService,
    RouteService
  ]
})
export class RutaEditarComponent implements OnInit {
  listCiudades: Ciudad[];
  @Input() rutaModificada = new Ruta();
  @Output() routeEditEvent = new EventEmitter();
  form: FormGroup;
  oIndex: number;
  dIndex: number;

  constructor(
    private cityService: CityService,
    private routeService: RouteService
  ) { }

  ngOnInit(): void {
    this.cityService.getCitys().subscribe(
      (list: any) => {
        this.listCiudades = list.data as Ciudad[];
        this.oIndex = this.listCiudades.findIndex(x => x.nombre === this.rutaModificada.Origen.nombre);
        this.dIndex = this.listCiudades.findIndex(x => x.nombre === this.rutaModificada.Destino.nombre);
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

  modifyRoute() {
    if (this.form.valid) 
    {
      this.rutaModificada.Origen = this.listCiudades[this.form.value.Origen];
      this.rutaModificada.Destino = this.listCiudades[this.form.value.Destino];
      this.routeService.modifyRoute(this.rutaModificada).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha modificado la ruta correctamente");
            this.routeEditEvent.emit();
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
