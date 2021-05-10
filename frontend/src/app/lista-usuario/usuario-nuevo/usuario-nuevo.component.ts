import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/module/usuario.module';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})

export class UsuarioNuevoComponent implements OnInit {
  @Input() usuarioNuevo = new Usuario();
  @Output() userNewEvent = new EventEmitter<Usuario>();
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  newUser(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.submitted = true;
      this.userNewEvent.emit(this.usuarioNuevo);
    }
  }

}
