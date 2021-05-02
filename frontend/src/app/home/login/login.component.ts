import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Session } from 'src/app/module/session.module';
import { Usuario } from 'src/app/module/usuario.module';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = new Usuario();
  @Output() submittedLogin = new EventEmitter();
  private errorMSN = new String();
  sessionForm: FormGroup;
  //Para quitar
  aux = new Usuario();

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.sessionForm.valid) {
      this.usuario.email = this.sessionForm.get('inputEmail').value;
      this.usuario.contrasenia = this.sessionForm.get('inputPassword').value;
      this.submittedLogin.emit();
      //se debe llamar al servico de autentificaci'on
      this.aux.apellido = "combi19";
      this.aux.nombre = "empresa"
      switch (this.usuario.email) {
        case "admin@combi19.com":
          this.aux.email = this.usuario.email;
          this.aux.tipo = 1;
          this.aux.usuario = "admin";
          this.correctLogin(new Session(this.aux));
          break;
        case "chofer@combi19.com":
          this.aux.email = this.usuario.email;
          this.aux.tipo = 2;
          this.aux.usuario = "chofer";
          this.correctLogin(new Session(this.aux));
          break;
        case "pasajero@combi19.com":
          this.aux.email = this.usuario.email;
          this.aux.tipo = 3;
          this.aux.usuario = "pasajero";
          this.correctLogin(new Session(this.aux));
          break;
        default:
          console.log("Fallo la autentificacion");
          break;
      }
    }
  }

  private correctLogin(data: Session) {
    this.storageService.logChange.emit(true);
    this.storageService.setCurrentSession(data);
  }

  cancel() {
    this.submittedLogin.emit();
  }
}
