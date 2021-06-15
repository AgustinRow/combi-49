import { Component, Input, OnInit } from '@angular/core';
import { Vianda } from 'src/app/module/vianda.module';

@Component({
  selector: 'app-vianda',
  templateUrl: './vianda.component.html',
  styleUrls: ['./vianda.component.css']
})
export class ViandaComponent implements OnInit {
  @Input() viandaConInfo = new Vianda();

  constructor() { }

  ngOnInit(): void {
  }

}
