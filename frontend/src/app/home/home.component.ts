import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from '../module/ciudad.module';
import { Viaje } from '../module/viaje.module';
import { CityService } from '../service/city.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() listCiudades: Ciudad[];
  listViajes: Viaje[];
  form: FormGroup;
  hoy = new Date(Date.now());
  currentRate = 0;

  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.refreshListCity();
        
    this.form = new FormGroup({
      'origen': new FormControl({}),
      'destino': new FormControl({}),
      'fecha_salida': new FormControl({})
    });
  }

  
  refreshListCity() {
    this.cityService.getCitys().subscribe(
      (list: any) => {
        this.listCiudades = list.data as Ciudad[];
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert("El servidor reporta estado: " + error.error.message);
        }
      }
    )
  }
}
