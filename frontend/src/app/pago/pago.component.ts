import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  @Output() payEvent = new EventEmitter<boolean>();
  cardForm: FormGroup;
  saveCard

  constructor() { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z ]+')]),
      'cardNumber': new FormControl(null, [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern('[0-9]+')]),
      'expiration': new FormGroup({
        'month': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern('[0-1][0-9]'),
          this.validMonth.bind(this)]),
        'year': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern('[0-9][0-9]')]),
      }),
      'cvc': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern('[0-9][0-9][0-9]')]),
    });
  }

  close() {
    this.closeEvent.emit();
  }

  payment() {
    if (this.isExpirate()) {
      alert("La tarjeta esta vencida. Intente con otra");
      this.cardForm.reset();
    } else {
      var isComplete = (Math.random() > 0.2);
      this.payEvent.emit(isComplete);
    }
    console.log(this.cardForm);
  }

  isExpirate(): boolean {
    const hoy = new Date(Date.now());
    var vencimiento = new Date(2000 + Number(this.cardForm.get('expiration.year').value), Number(this.cardForm.get('expiration.month').value) + 1, 0)
    return vencimiento < hoy;
  }

  validMonth(control: FormControl): { [s: string]: boolean } {
    if ((Number(control.value) < 1) || (Number(control.value) > 12)) {
      return { 'invalidMonth': true };
    }

    return null;
  }

}
