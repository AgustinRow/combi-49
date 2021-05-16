import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/module/usuario.module';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [
    StorageService]
})
export class NavBarComponent implements OnInit, OnChanges {
  @Input() isLoggedNavbar: boolean = false;
  @Output() submitNewCommentEvent = new EventEmitter<Component>();
  @Input() componentList: [];
  isCollapsed: boolean;
  usuarioIdentificado: Usuario;
  USUARIO_ADMINISTRADOR = UserService.USUARIO_ADMINISTRADOR;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private modalCommentService: NgbModal
  ) {
    //Ver porque no lo toma
    this.storageService.logChange.subscribe(
      (newState: boolean) => {
        this.isLoggedNavbar = newState;
        this.isLogged();
        console.log('newState : ', newState);
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
    console.log(changes);
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
}
