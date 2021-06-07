import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLouding = new Subject<boolean>();

  constructor() { }

  show(): void {
    this.isLouding.next(true);
  }

  hide(): void {
    this.isLouding.next(false);
  }
}
