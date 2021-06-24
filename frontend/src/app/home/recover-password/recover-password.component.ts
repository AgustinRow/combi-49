import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
  providers: [
    UserService
  ]
})
export class RecoverPasswordComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  sendMail(form: NgForm){
    this.userService.recoverPassword(form.value.inputEmail).subscribe(
      (data: any) => {
        if (data != null) {
          alert("Se ha enviado un correo. Verifique su bandeja de entrada o spam he intente iniciar sesión una vez más.");
        }
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
    this.closeEvent.emit();
  }

  close(){
    this.closeEvent.emit();
  }

}
