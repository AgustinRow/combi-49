import { Component, OnInit } from '@angular/core';
import { Pasaje } from '../module/pasaje.module';
import { PassageService } from '../service/passage.service';

@Component({
  selector: 'app-lista-pasaje',
  templateUrl: './lista-pasaje.component.html',
  styleUrls: ['./lista-pasaje.component.css'],
  providers: [
    PassageService
  ]
})
export class ListaPasajeComponent implements OnInit {
  listT: Pasaje[] = [];

  constructor(
    private passageService: PassageService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.passageService.getPassages().subscribe(
      (list: any) => {
        this.listT = list.data as Pasaje[];
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
