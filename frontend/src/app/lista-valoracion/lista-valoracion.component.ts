import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Valoracion } from '../module/valoracion.module';
import { Viaje } from '../module/viaje.module';
import { RatingService } from '../service/rating.service';
import { TravelService } from '../service/travel.service';

@Component({
  selector: 'app-lista-valoracion',
  templateUrl: './lista-valoracion.component.html',
  styleUrls: ['./lista-valoracion.component.css'],
  providers: [
    TravelService,
    RatingService
  ]
})
export class ListaValoracionComponent implements OnInit {
  @Input() lViajes: Viaje[] = [];
  viajeSeleccionado: Viaje;

  constructor(
    private modalService: NgbModal,
    private travelService: TravelService,
    private ratingService: RatingService,
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }
  
  openModal(contentEdit, select: Viaje) {
    this.viajeSeleccionado = select;
    this.modalService.open(contentEdit);
  }

  refreshList() {
    this.travelService.getTravels().subscribe(
      (list: any) => {
        this.lViajes = [...(list.data as Viaje[]).filter(viaje => viaje.Estado.estado.match('Finalizado'))]
        this.lViajes.forEach(
          (viaje) => {
            this.ratingService.getRatingById(viaje).subscribe(
              (body: any) => {
                viaje.Valoracion = body.data.Valoracion as Valoracion[];
                //Calculo por cada viaje
                if (viaje.Valoracion.length !== 0) {
                  var suma = 0;
                  viaje.Valoracion.forEach(v => {
                    suma += v.puntuacion;
                  });
                  viaje.valoracionPromedio = suma / viaje.Valoracion.length;
                  viaje.valoracionCompletada = viaje.Valoracion.length / viaje.Vehiculo[0].asientos;
                } else {
                  viaje.valoracionPromedio = 0;
                  viaje.valoracionCompletada = 0;
                }
              }
            )
          });
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

}
