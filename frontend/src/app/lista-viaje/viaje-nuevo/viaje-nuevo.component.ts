import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ruta } from 'src/app/module/ruta.module';
import { Vehiculo } from 'src/app/module/vehiculo.module';
import { Viaje } from 'src/app/module/viaje.module';
import { Usuario } from 'src/app/module/usuario.module';
import { VehicleService } from 'src/app/service/vehicle.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { RouteService } from 'src/app/service/route.service';
import { TravelService } from 'src/app/service/travel.service';

@Component({
  selector: 'app-viaje-nuevo',
  templateUrl: './viaje-nuevo.component.html',
  styleUrls: ['./viaje-nuevo.component.css']
})
export class ViajeNuevoComponent implements OnInit {
  viajeNuevo = new Viaje();
  @Input() listRutas: Ruta[];
  @Input() listVehiculos: Vehiculo[];
  @Input() listChoferes: Usuario[];
  @Output() travelNewEvent = new EventEmitter<Viaje>();
  form: FormGroup;
  hoy = new Date(Date.now());
  @Output() closeEvent = new EventEmitter();

  constructor(
    private travelService: TravelService,
    private vehicleService: VehicleService,
    private userService: UserService,
    private routeService: RouteService
  ) { }

  ngOnInit(): void {
    this.refreshListVehicle();
    this.refreshListUser();
    this.refreshListRoute();
    
    this.form = new FormGroup({
      'nombre': new FormControl({}),
      'ruta': new FormControl({}),
      'fecha_salida': new FormControl({}),
      'hora': new FormControl({}),
      'chofer': new FormControl({}),
      'vehiculo': new FormControl({}),
      'precio': new FormControl({}),
      'detalle': new FormControl({})
    });
  }

  newTravel() {
    if(this.form.valid) 
    {
      this.viajeNuevo.rutaId = this.listRutas[this.form.value.ruta].id;
      this.viajeNuevo.vehiculoId = this.listVehiculos[this.form.value.vehiculo].id;
      this.viajeNuevo.choferId = this.listChoferes[this.form.value.chofer].id;
      this.travelService.addTravel(this.viajeNuevo).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha creado el viaje correctamente");
            this.travelNewEvent.emit(data.data);
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

  refreshListUser(){
    this.userService.getChoffers().subscribe(
      (list: any) => {
        this.listChoferes = list.data as Usuario[];
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

  refreshListVehicle(){
    this.vehicleService.getvehicles().subscribe(
      (list: any) => {
        this.listVehiculos = list.data as Vehiculo[];
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

  refreshListRoute(){
    this.routeService.getRoutes().subscribe(
      (list: any) => {
        this.listRutas = list.data as Ruta[];
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
  
  close(){
    this.closeEvent.emit();
  }

}
