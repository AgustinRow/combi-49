import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  pasajeSeleccionado: Pasaje;

  constructor(
    private modalService: NgbModal,
    private passageService: PassageService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }
  
  openModal(contentEdit, passageSelected: Pasaje) {
    this.pasajeSeleccionado = passageSelected;
    this.modalService.open(contentEdit);
  }

  refreshList() {
    this.passageService.getPassages().subscribe(
      (list: any) => {
        this.listT = list.pasajes as Pasaje[];
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
