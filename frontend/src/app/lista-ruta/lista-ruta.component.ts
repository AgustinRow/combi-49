import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta } from '../module/ruta.module';
import { RouteService } from '../service/route.service';

@Component({
  selector: 'app-lista-ruta',
  templateUrl: './lista-ruta.component.html',
  styleUrls: ['./lista-ruta.component.css'],
  providers: [
    RouteService
  ]
})
export class ListaRutaComponent implements OnInit {
  listRutas: Ruta[] = [];
  rutaSeleccionada: Ruta;

  constructor(
    private routeService: RouteService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, select: Ruta) {
    this.rutaSeleccionada = select;
    this.modalService.open(contentEdit);
  }

  deleteRoute(select: Ruta) {
    this.routeService.deleteRoute(select).subscribe(
      (data: any) => {
        if (data != null) {
          alert("Se ha eliminado la Ruta correctamente");
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
    this.refreshList();
  }

  refreshList(){
    this.routeService.getRoutes().subscribe(
      (list: any) => {
        this.listRutas = list.data as Ruta[];
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
