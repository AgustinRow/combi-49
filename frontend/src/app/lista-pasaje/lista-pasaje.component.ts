import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pasaje } from '../module/pasaje.module';
import { Vianda } from '../module/vianda.module';
import { FoodboxService } from '../service/foodbox.service';
import { PassageService } from '../service/passage.service';
import { StorageService } from '../service/storage.service';

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
  viandasCompradas: { aPagar: boolean; viandas: Vianda[]; total: number }[] = [];
  totalViandas: number = 0;
  indexPasajeSeleccionado: number;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private passageService: PassageService,
    private foodboxService: FoodboxService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }



  openModal(contentEdit, passageSelected: Pasaje, index: number) {
    this.pasajeSeleccionado = passageSelected;
    this.indexPasajeSeleccionado = index;
    this.totalViandas = this.viandasCompradas[this.indexPasajeSeleccionado].total
    this.modalService.open(contentEdit);
  }

  refreshList() {
    this.passageService.findByIdUser(this.storageService.getCurrentUser().id).subscribe(
      (list: any) => {
        console.log(list);
        //this.listT = list.data.Pasaje as Pasaje[];
        this.listT = [...(list.data.Pasaje as Pasaje[]).filter(pasaje => pasaje.Estado.estado.match('Pendiente'))];
        this.listT.forEach(() => { this.viandasCompradas.push({ aPagar: false, viandas: [], total: 0 }) });
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
    var index = this.listT.indexOf(this.pasajeSeleccionado);
    this.viandasCompradas[index].aPagar = true;
    this.viandasCompradas[index].viandas = listaVianda;
    this.viandasCompradas[index].viandas.forEach(vianda => {
      this.viandasCompradas[index].total += vianda.precio;
    });
  }

  payment(estaPago: boolean) {
    if (estaPago) {
      this.foodboxService.buyFoodbox(this.viandasCompradas[this.indexPasajeSeleccionado].viandas, this.pasajeSeleccionado).subscribe(
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

  //agregar validaciones correspondientes
  cancelTrip() {
    this.passageService.cancelPassage(this.pasajeSeleccionado).subscribe(
      (data: any) => {
        if (data != null) {
          alert("Se ha cancelado el pasaje y se le ha devuelto el dinero");
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
    )

  }

}