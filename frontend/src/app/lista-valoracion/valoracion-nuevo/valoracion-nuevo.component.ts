import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Valoracion } from 'src/app/module/valoracion.module';
import { RatingService } from 'src/app/service/rating.service';

@Component({
  selector: 'app-valoracion-nuevo',
  templateUrl: './valoracion-nuevo.component.html',
  styleUrls: ['./valoracion-nuevo.component.css']
})
export class ValoracionNuevoComponent implements OnInit {
  nuevaValoracion: Valoracion = new Valoracion;
  form: FormGroup;
  @Output() ratingNewEvent = new EventEmitter<Valoracion>();

  constructor(
    private ratingService: RatingService,
  ) { }

  ngOnInit(): void {
    this.nuevaValoracion.puntuacion = 0;
    this.nuevaValoracion.detalle = "Ingrese un detalle";

    this.form = new FormGroup({
      'puntuacion': new FormControl({}),
      'detalle': new FormControl({}),
    });
  }

  newRating() {
      if (this.form.valid) {
        this.ratingService.addRating(this.nuevaValoracion).subscribe(
          (data: any) => {
            if (data != null) {
              alert("Se ha creado el viaje correctamente");
              this.ratingNewEvent.emit(data.data);
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
