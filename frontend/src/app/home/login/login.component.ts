import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from 'src/app/module/session.module';
import { Usuario } from 'src/app/module/usuario.module';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    StorageService,
    AuthenticationService],
})
export class LoginComponent implements OnInit {
  usuario = new Usuario();
  @Output() submittedLogin = new EventEmitter();
  sessionForm: FormGroup;
  private errorMSN = new String();

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.sessionForm = new FormGroup({
      'inputEmail': new FormControl(null, [Validators.email]),
      'inputPassword': new FormControl(null, [Validators.required])
    });
  }

  ngOnChange(){

  }

  loginUser() {
    if (this.sessionForm.valid) {
      this.usuario.email = this.sessionForm.get('inputEmail').value;
      this.usuario.password = this.sessionForm.get('inputPassword').value;
      this.authService.loginUser(this.usuario).subscribe(
        (data: any) => {
          if (data.data != null) {
            this.correctLogin(data);
          }
          else {
            console.log("El usuario o contraseña son incorrectos");
          }
        },
        (error) => {
          if (error.status >= 500) {
            this.errorMSN = "Error en el servidor, por favor intente mas tarde";
          } else {
            this.errorMSN = "El usuario o contraseña es invalido";
          }
          alert(this.errorMSN)
        }
      );
    }
    else {
      console.log("Formulario no valido");
    }
  }

  private correctLogin( object: any) {
    this.storageService.login(new Session(object));
    this.submittedLogin.emit();
    //this.router.navigate(['/']);
  }

  cancel() {
    this.submittedLogin.emit();
  }
}
