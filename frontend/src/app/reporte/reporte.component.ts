import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  ver: String = "Pasaje";

  constructor() { }

  ngOnInit(): void {
  }
  
  onSelect(selction: String) {
    this.ver = selction;
  }

}
