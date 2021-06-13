import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/module/usuario.module';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {
  @Input() usuarioModificado = new Usuario();
  @Output() userEditEvent = new EventEmitter();
  submitted = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  modifyUser(formulario: NgForm) {
    if (formulario.valid) {
      this.usuarioModificado.tipo = UserService.USUARIO_PASAJERO;
      this.userService.modifyUser(this.usuarioModificado).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha modificado el usuario correctamente");
            this.userEditEvent.emit();
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
      this.submitted = true;
    }
  }
}
