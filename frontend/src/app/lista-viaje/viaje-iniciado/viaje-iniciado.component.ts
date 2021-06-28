import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/module/usuario.module';
import { Viaje } from 'src/app/module/viaje.module';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-viaje-iniciado',
  templateUrl: './viaje-iniciado.component.html',
  styleUrls: ['./viaje-iniciado.component.css']
})
export class ViajeIniciadoComponent implements OnInit {
  usuarioIdentificado: Usuario;
  ver: String = "Detalles";
  findString:string = "";
  viajeEnCurso: Viaje;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.usuarioIdentificado = this.storageService.getCurrentUser();
  }

  onSelect(selction: String) {
    this.ver = selction;
  }
}
