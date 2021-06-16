import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Output() closeEvent = new EventEmitter();
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
          alert(error.error.message);
        }
      }
    )
  }

  modifyRoute( form:NgForm ) {
    if (form.valid) 
    {
      this.rutaModificada.Origen = this.listCiudades[form.value.origen];
      this.rutaModificada.Destino = this.listCiudades[form.value.destino];
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
            alert(error.error.message);
          }
        }
      );
    }
  }
  
  close(){
    this.closeEvent.emit();
  }

}
