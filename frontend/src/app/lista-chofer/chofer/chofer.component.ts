import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/module/usuario.module';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.css']
})
export class ChoferComponent implements OnInit {
  @Input() usuarioConInfo = new Usuario();

  constructor() { }

  ngOnInit(): void {
  }

}
