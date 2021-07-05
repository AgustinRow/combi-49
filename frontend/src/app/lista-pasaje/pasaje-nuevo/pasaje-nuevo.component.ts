import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Viaje } from 'src/app/module/viaje.module';
import { TravelService } from 'src/app/service/travel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PassageService } from 'src/app/service/passage.service';
import { Pasaje } from 'src/app/module/pasaje.module';
import { StorageService } from 'src/app/service/storage.service';
import { Membresia } from 'src/app/module/membresia.module';

@Component({
  selector: 'app-pasaje-nuevo',
  templateUrl: './pasaje-nuevo.component.html',
  styleUrls: ['./pasaje-nuevo.component.css']
})
export class PasajeNuevoComponent implements OnInit {
  viajeSeleccionado = new Viaje();
  pasajeNuevo = new Pasaje();
  descuento = 0;
  total = 0;
  membresia: Membresia;
  @Output() passageNewEvent = new EventEmitter<Pasaje>();

  constructor(
    private storageService: StorageService,
    private travelService: TravelService,
    private passageService: PassageService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
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
        this.membresia = this.storageService.getCurrentUser().Membresia;
        if (this.membresia && this.membresia.activo) {
          this.descuento = this.viajeSeleccionado.precio * .1;
          this.total = this.viajeSeleccionado.precio * .9;
        } else {
          this.total = this.viajeSeleccionado.precio;
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

  payment(estaPago: boolean) {
    if (estaPago) {
      this.pasajeNuevo.Viaje = this.viajeSeleccionado;
      this.pasajeNuevo.Pasajero = this.storageService.getCurrentUser();
      this.passageService.addPassage(this.pasajeNuevo).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha pagado el pasaje correctamente");
            this.passageNewEvent.emit(data.data);
            this.router.navigate(['/']);
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
