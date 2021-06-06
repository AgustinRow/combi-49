import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/module/usuario.module';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chofer-editar',
  templateUrl: './chofer-editar.component.html',
  styleUrls: ['./chofer-editar.component.css']
})
export class ChoferEditarComponent implements OnInit {
  @Input() choferModificado = new Usuario();
  @Output() choferModifyEvent = new EventEmitter<Usuario>();
  submitted = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  modifyChofer(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.choferModificado.tipo = UserService.USUARIO_CHOFER;
      this.userService.modifyUser(this.choferModificado).subscribe(
        (data: any)=>{
          if(data != null)
          {
            alert("Se ha modificado el usuario correctamente");
            this.choferModifyEvent.emit(this.choferModificado);
          }
        },
        (error) => {
          if (error.status >= 500) {
            alert("Problemas para conectarse con el servidor");
          }
          else {
            alert("El servidor reporta estado: " + error.error.message);
          }
        }
      );
      this.submitted = true;
    }
  }
}
