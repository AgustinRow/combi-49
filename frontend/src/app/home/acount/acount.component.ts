import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.usuarioIdentificado = this.storageService.getCurrentSession().user;
  }

  onSelect(selction: string) {
    this.ver = selction;
  }

  openModal(contentEdit) {
    this.modalService.open(contentEdit);
  }

  cancelAcount(){
    this.userService.cancelUserAcount(this.usuarioIdentificado).subscribe(
      (data: any) => {
        if (data != null) {
          alert("La baja de la cuenta se genero con éxito. A partir de este momento no podra acdeder a la compra de pasajes o ver su historial");
          this.storageService.logout();
          this.router.navigate(['/']);
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
