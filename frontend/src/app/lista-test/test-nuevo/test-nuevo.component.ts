import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pasaje } from 'src/app/module/pasaje.module';
import { Test } from 'src/app/module/test.module';
import { TestService } from 'src/app/service/test.service';

@Component({
  selector: 'app-test-nuevo',
  templateUrl: './test-nuevo.component.html',
  styleUrls: ['./test-nuevo.component.css'],
  providers: [
    DecimalPipe,
  ]
})
export class TestNuevoComponent implements OnInit {
  @Input() pasaje: Pasaje;
  @Input() testNuevo = new Test();
  @Output() testNewEvent = new EventEmitter<Test>();
  @Output() closeEvent = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.testNuevo.temperatura = 37.0;
    this.testNuevo.olfato = false;
    this.testNuevo.contacto_estrecho = false;
  }

  newTest(form: NgForm) {
    if(form.valid) 
    {
      this.testNuevo.pasajeId = this.pasaje.id;
      this.testNuevo.olfato = form.value.olfato;
      this.testNuevo.contacto_estrecho = form.value.contacto_estrecho;
      this.testService.addTest(this.testNuevo).subscribe(
        (res: any) => {
          if (!res.data) {
            alert("Ha aprobado el test. Puede viajar");
          } else{
            alert("No ha pasado el test. Se cancela el pasaje");
          }
          this.testNewEvent.emit(res.data);
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

  actualizarTemperatura(subir: boolean){
    if (subir) {
      this.testNuevo.temperatura += 0.1
    } else {
      this.testNuevo.temperatura -= 0.1
    }
    this.testNuevo.temperatura = Number(this.decimalPipe.transform(this.testNuevo.temperatura,'2.1-1'));
  }
  
  close(){
    this.closeEvent.emit();
  }

}
