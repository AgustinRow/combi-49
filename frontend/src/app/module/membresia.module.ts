import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Membresia {
  id: number;
	activo: boolean;
	descuento: number;
	createdAt: Date;
	updatedAt: Date;
	UsuarioId: number;
	fecha_vencimiento: Date;
 }
