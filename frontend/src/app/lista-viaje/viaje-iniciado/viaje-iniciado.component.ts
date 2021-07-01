import { Component, OnInit } from '@angular/core';
import { Pasaje } from 'src/app/module/pasaje.module';
import { Usuario } from 'src/app/module/usuario.module';
import { Viaje } from 'src/app/module/viaje.module';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-viaje-iniciado',
  templateUrl: './viaje-iniciado.component.html',
  styleUrls: ['./viaje-iniciado.component.css']
})
export class ViajeIniciadoComponent implements OnInit {
  usuarioIdentificado: Usuario;
  ver: String = "Detalles";
  findString: string = "";
  viajeEnCurso: Viaje;
  listP: Pasaje[] = [];
  listP_completado: Pasaje[] = [];
  showTestForm = false;
  seleccionado: number;
  showInitTravel = false;

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.usuarioIdentificado = this.storageService.getCurrentUser();
    this.refreshList();
  }


  refreshList() {
    this.userService.getChofferTravels(this.usuarioIdentificado.id).subscribe(
      (list: any) => {
        this.viajeEnCurso = [...(list.data.Viaje as Viaje[]).filter(viaje => viaje.Estado.estado.match('En curso'))][0];
        this.viajeEnCurso.Chofer = [this.usuarioIdentificado];
        this.userService.getPassagersInTravel(this.viajeEnCurso.id).subscribe(
          (viajesConPasajeros: any) => {
            this.listP.length = 0;
            this.listP_completado.length = 0;
            (viajesConPasajeros.data.Pasaje as Pasaje[]).forEach(
              pasaje => {
                if((pasaje.Test === null)/*&&(pasaje.Estado.estado != 'Ausente')*/){
                  this.listP.push(pasaje);
                }else{
                  this.listP_completado.push(pasaje);
                }
              }
            );
            if ((this.listP.length !== 0 )&&(this.listP_completado.length > 0 )) {
              //Estan todos los pasajeros testeados o ausentes, se puede comenzar a salir

            }
            console.log(viajesConPasajeros);
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

  onSelect(selction: String) {
    this.ver = selction;
  }

  iniciarTest(index: number) {
    this.seleccionado = index;
    this.showTestForm = true;
  }

  finalizarTest() {
    this.showTestForm = false;
  }

  cancelTest() {
    this.showTestForm = false;
  }
}
