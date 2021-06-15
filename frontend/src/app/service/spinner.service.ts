import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLouding = new Subject<boolean>();

  constructor() { }

  show(): void {
    setTimeout(
      () => this.isLouding.next(true)
    );
  }

  hide(): void {
    setTimeout(
      () => this.isLouding.next(false)
    );
  }
}
