import { Component, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ciudad } from '../module/ciudad.module';
import { CityService } from '../service/city.service';

@Component({
  selector: 'app-lista-ciudad',
  templateUrl: './lista-ciudad.component.html',
  styleUrls: ['./lista-ciudad.component.css'],
  providers: [
    CityService
  ]
})
export class ListaCiudadComponent implements OnInit {
  listCiudades: Ciudad[] = [];
  private ciudadSeleccionada: number;
  @Output() aux: Ciudad;

  constructor(
    private cityService: CityService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, select: Ciudad) {
    if (select !== null) {
      this.ciudadSeleccionada = this.listCiudades.indexOf(select);
      this.aux = new Ciudad();
      this.aux.nombre = select.nombre;
      this.aux.Provincia = select.Provincia;
      this.aux.id = select.id;
      this.aux.cp = select.cp;
    }
    this.modalService.open(contentEdit);
  }

  deleteCiudad(select: Ciudad) {
    this.cityService.deleteCity(select).subscribe(
      (data: any) => {
        if (data != null) {
          alert("Se ha eliminado la ciudad correctamente");
        }
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert("El servidor reporta estado: " + error.error.message);
        }
      }
    );
    this.refreshList();
  }

  refreshList() {
    this.cityService.getCitys().subscribe(
      (list: any) => {
        this.listCiudades = list.data as Ciudad[];
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert("El servidor reporta estado: " + error.error.message);
        }
      }
    )
  }
}
