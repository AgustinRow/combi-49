import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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
  form: FormGroup;
  rIndex: number;
  cIndex: number;
  vIndex: number;

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
    
    this.rIndex = this.listRutas.findIndex(x => x.id === this.viajeModificado.ruta.id);
  }

  modifyTravel() {
    if (this.form.valid) 
    {
      this.viajeModificado.ruta = this.listRutas[this.form.value.ruta];
      this.viajeModificado.vehiculo = this.listVehiculos[this.form.value.vehiculo];
      this.viajeModificado.chofer = this.listChoferes[this.form.value.chofer];
      this.travelEditEvent.emit();
      this.submitted = true;
    }
  }

  refreshListUser(){
    this.userService.getChoffers().subscribe(
      (list: any) => {
        this.listChoferes = list.data as Usuario[];
        this.cIndex = this.listChoferes.findIndex(x => x.email === this.viajeModificado.chofer.email);
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
        this.vIndex = this.listVehiculos.findIndex(x => x.patente === this.viajeModificado.vehiculo.patente);
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
