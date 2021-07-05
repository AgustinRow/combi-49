import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/module/session.module';
import { Usuario } from 'src/app/module/usuario.module';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MembershipService } from 'src/app/service/membership.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [
    StorageService,
    AuthenticationService
  ]
})
export class NavBarComponent implements OnInit, OnChanges {
  @Input() isLoggedNavbar: boolean = false;
  @Output() submitNewCommentEvent = new EventEmitter<Component>();
  @Input() componentList: [];
  isCollapsed: boolean;
  usuarioIdentificado: Usuario;
  USUARIO_ADMINISTRADOR = UserService.USUARIO_ADMINISTRADOR;
  USUARIO_PASAJERO = UserService.USUARIO_PASAJERO;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private modalCommentService: NgbModal,
    private membershipService: MembershipService,
    private authService: AuthenticationService
  ) {
    //Ver porque no lo toma
    this.storageService.logChange.subscribe(
      (newState: boolean) => {
        this.isLoggedNavbar = newState;
        this.isLogged();
      },
      (error) => {
        console.log('ERROR verify : ', error);
      },
    );

  }

  ngOnInit(): void {
    this.usuarioIdentificado = new Usuario();
    this.isCollapsed = true;
    this.isLogged();
  }

  ngOnChanges(changes) {
    this.storageService.logChange.emit(true);
  }

  isLogged() {
    if (this.storageService.getCurrentSession() != null) {
      this.usuarioIdentificado = this.storageService.getCurrentSession().user;
      this.isLoggedNavbar = true;
    }
    else {
      this.isLoggedNavbar = false;
    }
  }

  onSelect(modalName) {
    this.modalCommentService.open(modalName);
  }

  logout() {
    this.storageService.logout();
    this.router.navigate(['/']);
  }


  payment(estaPago: boolean) {
    if (estaPago) {
      this.membershipService.addMembership(this.usuarioIdentificado).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha pagado la membrecia correctamente");
            this.authService.loginUser(this.usuarioIdentificado).subscribe(
              (session: any) => {
                console.log(session)
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
    else {
      alert("No se pudo completar el pago");
    }
  }
}
