import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Estado } from 'src/app/module/estado.module';
import { Pasaje } from 'src/app/module/pasaje.module';
import { PassageService } from 'src/app/service/passage.service';

@Component({
  selector: 'app-por-pasaje',
  templateUrl: './por-pasaje.component.html',
  styleUrls: ['./por-pasaje.component.css']
})
export class PorPasajeComponent implements OnInit {
  listP: Pasaje[];
  showResult: boolean = false;
  passageState: Estado[];
  filtroEstado = "";

  constructor(
    private passageService : PassageService
  ) { }

  ngOnInit(): void {
    this.passageService.getPassageStates().subscribe(
      (respond: any) => {
        this.passageState = respond.data as Estado[];
      }
    );
  }

  
  newReport( form: NgForm) {
    this.passageService.reportBetweenDates(form.value.fecha_inicio, form.value.fecha_fin).subscribe(
      (list: any) => {
        this.listP = (list.data as Pasaje[]);
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
