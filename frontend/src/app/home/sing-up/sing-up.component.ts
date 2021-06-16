import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/module/usuario.module';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
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
      this.submitted = true;this.userService.addUser(this.usuarioNuevo).subscribe(
        (data: Usuario)=>{
          if(data != null)
          {
            alert("Se ha creado el usuario correctamente");
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
      this.userNewEvent.emit(this.usuarioNuevo);
    }
    this.router.navigate(['/']);
  }
}
