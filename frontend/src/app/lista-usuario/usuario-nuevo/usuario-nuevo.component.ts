import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/module/usuario.module';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css'], 
  providers: [
    StorageService,
    AuthenticationService,
    UserService
  ],
})
export class UsuarioNuevoComponent implements OnInit {
  @Input() usuarioNuevo = new Usuario();
  @Output() userNewEvent = new EventEmitter<Usuario>();
  submitted = false;

  constructor(
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  newUser(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.usuarioNuevo.tipo = UserService.USUARIO_PASAJERO;
      this.submitted = true;
      this.userService.addUser(this.usuarioNuevo).subscribe(
        (data: Usuario)=>{
          if(data != null)
          {
            alert("Se ha creado el usuario correctamente");
            this.userNewEvent.emit(this.usuarioNuevo);
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
    }
  }

}
