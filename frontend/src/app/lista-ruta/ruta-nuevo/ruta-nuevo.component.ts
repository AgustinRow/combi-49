import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Output() closeEvent = new EventEmitter();

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
          alert(error.error.message);
        }
      }
    )
    
  }

  newRoute(form: NgForm) {
    if(form.valid) 
    {
      this.rutaNueva.Origen = this.listCiudades[form.value.origen];
      this.rutaNueva.Destino = this.listCiudades[form.value.destino];
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
