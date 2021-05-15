import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ruta } from 'src/app/module/ruta.module';
import { Usuario } from 'src/app/module/usuario.module';
import { Vehiculo } from 'src/app/module/vehiculo.module';
import { Viaje } from 'src/app/module/viaje.module';
import { MockService } from 'src/app/service/mock.service.';
import { UserService } from 'src/app/service/user.service';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-viaje-editar',
  templateUrl: './viaje-editar.component.html',
  styleUrls: ['./viaje-editar.component.css']
})
export class ViajeEditarComponent implements OnInit {
  @Input() listRutas: Ruta[];
  @Input() listVehiculos: Vehiculo[];
  @Input() listChoferes: Usuario[];
  @Input() viajeModificado = new Viaje();
  @Output() travelEditEvent = new EventEmitter();
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

  modifyTravel(formulario: NgForm) {
    if (formulario.valid) {
      this.travelEditEvent.emit();
      this.submitted = true;
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
