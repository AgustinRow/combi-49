import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vianda } from 'src/app/module/vianda.module';
import { FoodboxService } from 'src/app/service/foodbox.service';

@Component({
  selector: 'app-vianda-nuevo',
  templateUrl: './vianda-nuevo.component.html',
  styleUrls: ['./vianda-nuevo.component.css'], 
  providers: [
    FoodboxService
  ],
})
export class ViandaNuevoComponent implements OnInit {
  @Input() viandaNueva:Vianda = new Vianda();
  @Output() viandaNewEvent = new EventEmitter();

  constructor(
    private foodboxServica: FoodboxService
  ) { }

  ngOnInit(): void {
  }

  newFoodbox(formulario: NgForm) {
    if (formulario.valid) {
      this.foodboxServica.addFoodbox(this.viandaNueva).subscribe(
        (data: Vianda) => {
          if (data != null) {
            alert("Se ha creado la vianda correctamente");
            this.viandaNewEvent.emit();
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
