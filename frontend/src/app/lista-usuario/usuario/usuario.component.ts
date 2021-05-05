import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/module/usuario.module';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @Input() usuarioConInfo = new Usuario();

  constructor() { }

  ngOnInit(): void {
  }

}
