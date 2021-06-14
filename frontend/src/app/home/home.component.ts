import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Ciudad } from '../module/ciudad.module';
import { Viaje } from '../module/viaje.module';
import { CityService } from '../service/city.service';
import { TravelService } from '../service/travel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() listCiudades: Ciudad[];
  listViajes: Viaje[];
  hoy = new Date(Date.now());
  travelToFind = new Viaje();

  constructor(
    private cityService: CityService,
    private travelService: TravelService
  ) { }

  ngOnInit(): void {
    this.refreshListCity();
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
          alert(error.error.message);
        }
      }
    )
  }

  searchTrip( form: NgForm) {
    this.travelService.findTravels( this.listCiudades[form.value.origen], this.listCiudades[form.value.destino], new Date(form.value.fecha_salida)).subscribe(
      (list: any) => {
        this.listViajes = list.data as Viaje[];
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
