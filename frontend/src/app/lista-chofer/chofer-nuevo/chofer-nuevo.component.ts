import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/module/usuario.module';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chofer-nuevo',
  templateUrl: './chofer-nuevo.component.html',
  styleUrls: ['./chofer-nuevo.component.css']
})
export class ChoferNuevoComponent implements OnInit {
  @Input() choferNuevo = new Usuario();
  @Output() choferNewEvent = new EventEmitter<Usuario>();
  submitted = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  newChofer(formulario: NgForm) {
    if (formulario.valid) {
      this.choferNuevo.tipo = 2;
      this.userService.addUser(this.choferNuevo).subscribe(
        (data: any) => {
          //console.log(data.created);
          if (data != null) {
            alert("Se ha creado el usuario correctamente");
            this.choferNewEvent.emit(this.choferNuevo);
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
