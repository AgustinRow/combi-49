import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Provincia } from 'src/app/module/provincia.module';
import { ProvinceService } from 'src/app/service/province.service';

@Component({
  selector: 'app-provincia-editar',
  templateUrl: './provincia-editar.component.html',
  styleUrls: ['./provincia-editar.component.css'],
  providers: [
    ProvinceService,
  ]
})
export class ProvinciaEditarComponent implements OnInit {
  @Input() provinciaModificada = new Provincia();
  @Output() provEditEvent = new EventEmitter();

  constructor(
    private provinceService: ProvinceService,
  ) { }

  ngOnInit(): void {
  }

  modifyProv(formulario: NgForm) {
    if (formulario.valid) {
      this.provinceService.modifyProvince(this.provinciaModificada).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha modificado la provincia correctamente");
            this.provEditEvent.emit();
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
