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
  listP: Pasaje[] = [];
  pasajeSeleccionado: Pasaje;
  viandasCompradas: { aPagar: boolean; viandas: Vianda[]; total: number }[] = [];
  totalViandas: number = 0;
  indexPasajeSeleccionado: number;
  ver = 'Pendiente';
  filtroEstado = ["Pendiente"];

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

  onSelect(selection: string) {
    this.ver = selection;
    switch (selection) {
      case 'Pendiente':
        this.filtroEstado = [this.ver];
        break;
      case 'Finalizado':
        this.filtroEstado = ['Finalizado', 'Ausente'];
        break;
      default:
        // Devueltos
        this.filtroEstado = ['Cancelado', 'Rechazado por covid-19'];
        break;
    }
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
        this.listP = list.data.Pasaje as Pasaje[];
        /* this.listP = [...(list.data.Pasaje as Pasaje[]).filter(pasaje => pasaje.Estado.estado.match('Pendiente'))];
        this.listP.forEach(() => { this.viandasCompradas.push({ aPagar: false, viandas: [], total: 0 }) }); */
        for (let step = 0; step < [...(list.data.Pasaje as Pasaje[]).filter(pasaje => pasaje.Estado.estado.match('Pendiente'))].length; step++) {
          this.viandasCompradas.push({ aPagar: false, viandas: [], total: 0 })
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

  toBuy(listaVianda: Vianda[]) {
    var index = this.listP.indexOf(this.pasajeSeleccionado);
    this.viandasCompradas[index].aPagar = true;
    this.viandasCompradas[index].viandas = listaVianda;
    this.viandasCompradas[index].viandas.forEach(vianda => {
      this.viandasCompradas[index].total += vianda.precio;
    });
    var membresia = this.storageService.getCurrentUser().Membresia;
    if (membresia && (membresia.activo)) {
      this.viandasCompradas[index].total *= (1 - (membresia.descuento / 100));
    }
  }

  payment(estaPago: boolean) {
    if (estaPago) {
      this.foodboxService.buyFoodbox(this.viandasCompradas[this.indexPasajeSeleccionado].viandas, this.pasajeSeleccionado).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha pagado correctamente");
            this.refreshList();
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
          this.refreshList()
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