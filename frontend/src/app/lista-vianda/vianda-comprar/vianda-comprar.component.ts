import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Membresia } from 'src/app/module/membresia.module';
import { Pasaje } from 'src/app/module/pasaje.module';
import { Vianda } from 'src/app/module/vianda.module';
import { FoodboxService } from 'src/app/service/foodbox.service';
import { StorageService } from 'src/app/service/storage.service';

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
  viandasAgregadas: Vianda[] = [];
  viandasParaVenta: Vianda[];
  totalViandas: number = 0;
  subtotalViandasAgregadas: number = 0;
  totalViandasAgregadas: number = 0;
  total:number = 0;
  descuentoTotal = 0;
  membresia: Membresia;
  @Output() compraViandaEvent = new EventEmitter<Vianda[]>()

  constructor(
    private foodboxService: FoodboxService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.refreshList();
    this.viandasCompradas = this.pasajeModificado.Vianda;
    this.membresia = this.storageService.getCurrentUser().Membresia;
    this.calcularTotal();
  }

  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
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
    this.viandasAgregadas.push(this.viandasParaVenta[formulario.value.vianda]);
    
    var descuento = 0;
    if(this.membresia && (this.membresia.activo)){
      descuento = this.viandasParaVenta[formulario.value.vianda].precio * (this.membresia.descuento/100);
      this.descuentoTotal += descuento;
    }

    this.subtotalViandasAgregadas += this.viandasParaVenta[formulario.value.vianda].precio;
    this.totalViandasAgregadas = this.subtotalViandasAgregadas - this.descuentoTotal;
  }

  deleteFood(v: Vianda){
    var i = this.viandasAgregadas.indexOf( v );
    i !== -1 && this.viandasAgregadas.splice( i, 1 );
    
        
    if(this.membresia && (this.membresia.activo)){
      this.descuentoTotal -= (v.precio * (this.membresia.descuento/100));
    }

    this.subtotalViandasAgregadas -= v.precio;
    this.totalViandasAgregadas = this.subtotalViandasAgregadas - this.descuentoTotal;
  }

  finishBuy(){
    this.compraViandaEvent.emit(this.viandasAgregadas);
  }
}
