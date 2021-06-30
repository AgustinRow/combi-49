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

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.usuarioIdentificado = this.storageService.getCurrentUser();

    this.userService.getChofferTravels(this.usuarioIdentificado.id).subscribe(
      (list: any) => {
        this.viajeEnCurso = [...(list.data.Viaje as Viaje[]).filter(viaje => viaje.Estado.estado.match('En curso'))][0];
        this.viajeEnCurso.Chofer = [this.usuarioIdentificado];
        this.userService.getPassagersInTravel(this.viajeEnCurso.id).subscribe(
          (viajesConPasajeros: any) => {
            this.listP = viajesConPasajeros.data.Pasaje;
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
}
