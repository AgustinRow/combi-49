import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/module/usuario.module';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.css']
})
export class AcountComponent implements OnInit {
  USUARIO_ADMINISTRADOR = UserService.USUARIO_ADMINISTRADOR;
  USUARIO_PASAJERO = UserService.USUARIO_PASAJERO;
  usuarioIdentificado = new Usuario;
  ver: String = "info";

  constructor(
    private storageService: StorageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.usuarioIdentificado = this.storageService.getCurrentSession().user;
  }

  onSelect(selction: String) {
    this.ver = selction;
  }
}
