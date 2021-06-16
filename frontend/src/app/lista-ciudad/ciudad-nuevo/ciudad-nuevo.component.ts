import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Provincia } from 'src/app/module/provincia.module';
import { CityService } from 'src/app/service/city.service';
import { ProvinceService } from 'src/app/service/province.service';

@Component({
  selector: 'app-ciudad-nuevo',
  templateUrl: './ciudad-nuevo.component.html',
  styleUrls: ['./ciudad-nuevo.component.css'],
  providers: [
    ProvinceService,
    CityService
  ]
})
export class CiudadNuevoComponent implements OnInit {
  ciudadNueva = new Ciudad();
  @Input() listProvincias: Provincia[];
  @Output() ciudadNewEvent = new EventEmitter<Ciudad>();
  form: FormGroup;

  constructor(
    private provinceService: ProvinceService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
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

    this.form = new FormGroup({
      'nombre': new FormControl({}),
      'codigoPostal': new FormControl({}),
      'provincia': new FormControl({})
    });
  }

  newCity() {
    if (this.form.valid) {
      this.ciudadNueva.Provincia = this.listProvincias[this.form.value.provincia];;
      this.cityService.addCity(this.ciudadNueva).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha creado la ciudad correctamente");
            this.ciudadNewEvent.emit(data.data);
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
  }
}
