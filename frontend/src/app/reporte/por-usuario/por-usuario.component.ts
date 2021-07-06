import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/module/usuario.module';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-por-usuario',
  templateUrl: './por-usuario.component.html',
  styleUrls: ['./por-usuario.component.css']
})
export class PorUsuarioComponent implements OnInit {
  listU: Usuario[];
  showResult: boolean = false;
  filtroUsuarioHabilitado = null;
  filtroTipoUsuario:number = -1 ;
  filtroConMembrecia = null;
  filtroEstadoMembresia = null;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }
  
  newReport( form: NgForm) {
    this.userService.reportBetweenDates(form.value.fecha_inicio, form.value.fecha_fin).subscribe(
      (list: any) => {
        this.listU = (list.data as Usuario[]);
        this.showResult = true;
        console.log(list);
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert(error.error.message);
        }
      }
    )
  }

}
