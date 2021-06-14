import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Time } from "@angular/common";
import { Viaje } from 'src/app/module/viaje.module';
import { TravelService } from 'src/app/service/travel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pasaje-nuevo',
  templateUrl: './pasaje-nuevo.component.html',
  styleUrls: ['./pasaje-nuevo.component.css']
})
export class PasajeNuevoComponent implements OnInit {
  viajeSeleccionado: Viaje;

  constructor(
    private travelService: TravelService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.refreshTravelSelected(Number(params['viajeId']));
    });

  }
  
  openModal(contentEdit) {
    this.modalService.open(contentEdit);
  }

  refreshTravelSelected(viajeId: Number) {
    this.travelService.getTravelById(viajeId).subscribe(
      (list: any) => {
        this.viajeSeleccionado = list.data as Viaje;
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
    );
  }

}
