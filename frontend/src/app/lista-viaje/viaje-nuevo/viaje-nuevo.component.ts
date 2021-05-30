import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ruta } from 'src/app/module/ruta.module';
import { Vehiculo } from 'src/app/module/vehiculo.module';
import { Viaje } from 'src/app/module/viaje.module';
import { Usuario } from 'src/app/module/usuario.module';
import { MockService } from 'src/app/service/mock.service.';
import { VehicleService } from 'src/app/service/vehicle.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-viaje-nuevo',
  templateUrl: './viaje-nuevo.component.html',
  styleUrls: ['./viaje-nuevo.component.css']
})
export class ViajeNuevoComponent implements OnInit {
  @Input() viajeNuevo = new Viaje();
  @Input() listRutas: Ruta[];
  @Input() listVehiculos: Vehiculo[];
  @Input() listChoferes: Usuario[];
  @Output() travelNewEvent = new EventEmitter<Viaje>();
  submitted = false;
  form: FormGroup;
  hoy = new Date(Date.now());

  constructor(
    private vehicleService: VehicleService,
    private userService: UserService, 
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listRutas = this.mockService.getRuta();
    this.refreshListVehicle();
    this.refreshListUser();
    
    this.form = new FormGroup({
      'ruta': new FormControl({}),
      'fechaSalida': new FormControl({}),
      'fechaLlegada': new FormControl({}),
      'chofer': new FormControl({}),
      'vehiculo': new FormControl({}),
      'detalle': new FormControl({})
    });
  }

  newTravel() {
    if(this.form.valid) 
    {
      this.viajeNuevo.ruta = this.listRutas[this.form.value.ruta];
      this.viajeNuevo.vehiculo = this.listVehiculos[this.form.value.vehiculo];
      this.viajeNuevo.chofer = this.listChoferes[this.form.value.chofer];
      this.submitted = true;
      this.travelNewEvent.emit(this.viajeNuevo);
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
          alert("El servidor reporta estado: " + error.error.message);
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
          alert("El servidor reporta estado: " + error.error.message);
        }
      }
    )
  }
}
