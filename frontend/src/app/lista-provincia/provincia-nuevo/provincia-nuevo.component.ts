import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Provincia } from 'src/app/module/provincia.module';
import { ProvinceService } from 'src/app/service/province.service';

@Component({
  selector: 'app-provincia-nuevo',
  templateUrl: './provincia-nuevo.component.html',
  styleUrls: ['./provincia-nuevo.component.css'],
  providers: [
    ProvinceService,
  ]
})
export class ProvinciaNuevoComponent implements OnInit {
  @Input() provinciaNueva = new Provincia();
  @Output() provinciaNewEvent = new EventEmitter<Provincia>();

  constructor(
    private provinceService: ProvinceService,
  ) { }

  ngOnInit(): void {
  }

  newProv(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.provinceService.addProvince(this.provinciaNueva).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha creado la provincia correctamente");
            this.provinciaNewEvent.emit(data.data);
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
    }
  }

}
