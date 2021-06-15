import { Component, OnInit, Output } from '@angular/core';
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
  @Output() aux: Vianda;

  constructor(
    private foodboxService: FoodboxService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, viandaselect: Vianda) {
    this.viandaSeleccionada = viandaselect;
    this.aux = new Vianda();
    this.aux.id = viandaselect.id;
    this.aux.precio = viandaselect.precio;
    this.aux.descripcion = viandaselect.descripcion;
    this.aux.nombre = viandaselect.nombre;
    this.aux.stock = viandaselect.stock;
    this.modalService.open(contentEdit);
  }

  deleteVianda(viandaselect: Vianda) {
    this.foodboxService.deleteFoodbox(viandaselect).subscribe(
      (data: Vianda) => {
        if (data != null) {
          alert("Se ha eliminado la vianda correctamente");
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
