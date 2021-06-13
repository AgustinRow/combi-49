import { Component, Input, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Provincia } from '../module/provincia.module';
import { ProvinceService } from '../service/province.service';

@Component({
  selector: 'app-lista-provincia',
  templateUrl: './lista-provincia.component.html',
  styleUrls: ['./lista-provincia.component.css'],
  providers: [
    ProvinceService,
  ]
})
export class ListaProvinciaComponent implements OnInit {
  @Input() listProvincias: Provincia[] = [];
  provinciaSeleccionada: Provincia;

  constructor(
    private provinceService: ProvinceService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, select: Provincia) {
    this.provinciaSeleccionada = select;
    this.modalService.open(contentEdit);
  }

  deleteProvincia(select: Provincia) {
    this.provinceService.deleteProvince(select).subscribe(
      (data: any) => {
        if (data != null) {
          alert("Se ha eliminado el vehiculo correctamente");
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
    this.provinceService.getProvinces().subscribe(
      (list: any) => {
        this.listProvincias = list.data as Provincia[];
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
