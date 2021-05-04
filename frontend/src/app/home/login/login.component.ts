import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  sessionForm: FormGroup;
  //Para quitar
  aux = new Usuario();

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.aux = new Usuario();
    this.sessionForm = new FormGroup({
      'inputEmail': new FormControl(null, [Validators.email]),
      'inputPassword': new FormControl(null, [Validators.required])
    });
  }

  loginUser() {
    if (this.sessionForm.valid) {
      this.usuario.email = this.sessionForm.get('inputEmail').value;
      this.usuario.contrasenia = this.sessionForm.get('inputPassword').value;
      //se debe llamar al servico de autentificaci'on
      this.aux.apellido = "combi19";
      this.aux.nombre = "empresa";
      switch (this.usuario.email) {
        case "admin@combi19.com":
          this.aux.email = this.usuario.email;
          this.aux.tipo = 1;
          this.aux.usuario = "admin";
          this.correctLogin(this.aux);
          break;
        case "chofer@combi19.com":
          this.aux.email = this.usuario.email;
          this.aux.tipo = 2;
          this.aux.usuario = "chofer";
          this.correctLogin(this.aux);
          break;
        case "pasajero@combi19.com":
          this.aux.email = this.usuario.email;
          this.aux.tipo = 3;
          this.aux.usuario = "pasajero";
          this.correctLogin(this.aux);
          break;
        default:
          console.log("Fallo la autentificacion");
          break;
      }
      this.submittedLogin.emit();
    }
    else {
      console.log("Formulario no valido");
    }
  }

  private correctLogin(data: Usuario) {
    this.storageService.logChange.emit(true);
    this.storageService.setCurrentSession(new Session(data));
    this.router.navigate(['/']);
  }

  cancel() {
    this.submittedLogin.emit();
  }
}
