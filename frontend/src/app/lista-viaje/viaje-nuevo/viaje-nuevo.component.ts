import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ruta } from 'src/app/module/ruta.module';
import { Vehiculo } from 'src/app/module/vehiculo.module';
import { Viaje } from 'src/app/module/viaje.module';
import { Usuario } from 'src/app/module/usuario.module';
import { MockService } from 'src/app/service/mock.service.';
import { VehicleService } from 'src/app/service/vehicle.service';
import { NgForm } from '@angular/forms';
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

  constructor(
    private vehicleService: VehicleService,
    private userService: UserService, 
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listRutas = this.mockService.lRutas;
    this.refreshListVehicle();
    this.refreshListUser();
  }

  newTravel(formulario: NgForm) {
    if(formulario.valid) 
    {
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
        console.log(error);
        alert("El servidor reporta estado: " + error.status);
      }
    )
  }

  refreshListVehicle(){
    this.vehicleService.getvehicles().subscribe(
      (list: any) => {
        this.listVehiculos = list.data as Vehiculo[];
      },
      (error) => {
        console.log(error);
        alert("El servidor reporta estado: " + error.status);
      }
    )
  }
}
