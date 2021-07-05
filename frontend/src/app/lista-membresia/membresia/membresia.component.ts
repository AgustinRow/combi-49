import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/module/session.module';
import { Usuario } from 'src/app/module/usuario.module';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MembershipService } from 'src/app/service/membership.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {
  @Input() userMembership: Usuario;

  constructor(
    private membershioService: MembershipService,
    private modalService: NgbModal,
    private authService: AuthenticationService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }

  openModal(contentEdit) {
    this.modalService.open(contentEdit);
  }

  cancelMembership(){
    this.membershioService.cancelMembership(this.userMembership).subscribe(
      (data: any) => {
        if (data != null) {
          alert("La cancelacion de la membresia se genero con éxito. A partir de este momento no podra acdeder a los descuentos");
          this.authService.loginUser(this.userMembership).subscribe(
            (session: any) => {
              if (session != null) {
                this.storageService.login(new Session(session));
              }
              else {
                console.log("El usuario o contraseña son incorrectos");
              }
            },
            (error) => {
              alert(error)
            }
          );
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
  }
}
