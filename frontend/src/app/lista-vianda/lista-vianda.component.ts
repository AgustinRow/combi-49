import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vianda } from '../module/vianda.module';
import { FoodboxService } from '../service/foodbox.service';

@Component({
  selector: 'app-lista-vianda',
  templateUrl: './lista-vianda.component.html',
  styleUrls: ['./lista-vianda.component.css'],
  providers: [
    FoodboxService
  ]
})
export class ListaViandaComponent implements OnInit {
  listaV: Vianda[] = [];
  viandaSeleccionada: Vianda;

  constructor(
    private foodboxService: FoodboxService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, viandaselect: Vianda) {
    this.viandaSeleccionada = viandaselect;
    this.modalService.open(contentEdit);
  }

  deleteVianda(viandaselect: Vianda) {
    this.foodboxService.deleteFoodbox(viandaselect).subscribe(
      (data: Vianda) => {
        if (data != null) {
          alert("Se ha eliminado la vianda correctamente");
          var i = this.listaV.indexOf(viandaselect);
          i !== -1 && this.listaV.splice(i, 1);
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
  }

  refreshList() {
    this.foodboxService.getFoodboxs().subscribe(
      (list: any) => {
        this.listaV = list.data as Vianda[];
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
