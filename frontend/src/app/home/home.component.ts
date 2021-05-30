import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from '../module/ciudad.module';
import { MockService } from '../service/mock.service.';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() listCiudades: Ciudad[];
  form: FormGroup;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listCiudades = this.mockService.getCiudad();
        
    this.form = new FormGroup({
      'origen': new FormControl({}),
      'destino': new FormControl({})
    });
  }

}
