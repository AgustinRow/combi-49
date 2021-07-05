import { Component, Input, OnInit } from '@angular/core';
import { Pasaje } from 'src/app/module/pasaje.module';
import { Usuario } from 'src/app/module/usuario.module';
import { PassageService } from 'src/app/service/passage.service';

@Component({
  selector: 'app-pasaje-historial',
  templateUrl: './pasaje-historial.component.html',
  styleUrls: ['./pasaje-historial.component.css'],
  providers: [
    PassageService
  ]
})
export class PasajeHistorialComponent implements OnInit {
  @Input() usuarioConInfo = new Usuario();
  pasajesComprados: Pasaje[] = [];

  constructor(
    private passageSercice: PassageService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.passageSercice.getPassagesBoughtByIdUser(this.usuarioConInfo).subscribe(
      (list: any) => {
        this.pasajesComprados = list.data.Pasaje as Pasaje[];
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

}
