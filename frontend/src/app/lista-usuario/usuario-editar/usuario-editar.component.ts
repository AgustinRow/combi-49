import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/module/usuario.module';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {
  @Input() usuarioModificado = new Usuario();
  @Output() userEditEvent = new EventEmitter();
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  modifyUser(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.submitted = true;
      this.userEditEvent.emit();
    }
  }
}
