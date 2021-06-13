import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vianda } from 'src/app/module/vianda.module';
import { FoodboxService } from 'src/app/service/foodbox.service';

@Component({
  selector: 'app-vianda-editar',
  templateUrl: './vianda-editar.component.html',
  styleUrls: ['./vianda-editar.component.css'], 
  providers: [
    FoodboxService
  ],
})
export class ViandaEditarComponent implements OnInit {
  @Input() viandaModificada:Vianda = new Vianda();
  @Output() viandaEditEvent = new EventEmitter();

  constructor(
    private foodboxServica: FoodboxService
  ) { }

  ngOnInit(): void {
  }

  modifyFoodbox(formulario: NgForm) {
    if (formulario.valid) {
      this.foodboxServica.modifyFoodbox(this.viandaModificada).subscribe(
        (data: Vianda) => {
          if (data != null) {
            alert("Se ha modificado la vianda correctamente");
            this.viandaEditEvent.emit();
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
