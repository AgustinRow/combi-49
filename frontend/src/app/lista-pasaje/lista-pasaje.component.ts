import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pasaje } from '../module/pasaje.module';
import { Vianda } from '../module/vianda.module';
import { FoodboxService } from '../service/foodbox.service';
import { PassageService } from '../service/passage.service';

@Component({
  selector: 'app-lista-pasaje',
  templateUrl: './lista-pasaje.component.html',
  styleUrls: ['./lista-pasaje.component.css'],
  providers: [
    PassageService,
    FoodboxService
  ]
})
export class ListaPasajeComponent implements OnInit {
  listT: Pasaje[] = [];
  pasajeSeleccionado: Pasaje;
  aPagar = false;
  viandasCompradas: Vianda[] = [];
  totalViandas: number = 0;

  constructor(
    private modalService: NgbModal,
    private passageService: PassageService,
    private foodboxService: FoodboxService
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

  toBuy(listaVianda: Vianda[]) {
    this.aPagar = true;

    this.viandasCompradas = listaVianda;
    this.viandasCompradas.forEach(vianda => {
      this.totalViandas += vianda.precio;
    });
  }

  payment(estaPago: boolean) {
    if (estaPago) {
      this.foodboxService.addFoodbox({ "viandas": this.viandasCompradas, "pasajeId": this.pasajeSeleccionado.id }).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha pagado correctamente");
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
    else {
      alert("No se pudo completar el pago");
    }
  }

}