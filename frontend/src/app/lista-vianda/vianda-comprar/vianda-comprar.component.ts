import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pasaje } from 'src/app/module/pasaje.module';
import { Vianda } from 'src/app/module/vianda.module';
import { FoodboxService } from 'src/app/service/foodbox.service';

@Component({
  selector: 'app-vianda-comprar',
  templateUrl: './vianda-comprar.component.html',
  styleUrls: ['./vianda-comprar.component.css'],
  providers: [
    FoodboxService
  ]
})
export class ViandaComprarComponent implements OnInit {
  @Input() pasajeModificado: Pasaje;
  viandasCompradas: Vianda[];
  viandasParaVenta: Vianda[];
  totalViandas: number = 0;
  total:number = 0;

  constructor(
    private foodboxService: FoodboxService,
  ) { }

  ngOnInit(): void {
    this.refreshList();
    this.viandasCompradas = this.pasajeModificado.Vianda;

    this.calcularTotal();
  }

  calcularTotal(){
    this.viandasCompradas.forEach(vianda => {
      this.totalViandas += vianda.precio;
    });

    this.total = this.totalViandas + this.pasajeModificado.precio;
  }

  refreshList() {
    this.foodboxService.getFoodboxs().subscribe(
      (list: any) => {
        this.viandasParaVenta = list.data as Vianda[];
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

  addFoodBox(formulario: NgForm){
    this.viandasCompradas.push(this.viandasParaVenta[formulario.value.vianda]);
    this.totalViandas += this.viandasParaVenta[formulario.value.vianda].precio;
    this.total += this.viandasParaVenta[formulario.value.vianda].precio;
  }

  deleteFood(v: Vianda){
    var i = this.viandasCompradas.indexOf( v );
    i !== -1 && this.viandasCompradas.splice( i, 1 );
    
    this.totalViandas += v.precio;
    this.total += v.precio;
  }
}
