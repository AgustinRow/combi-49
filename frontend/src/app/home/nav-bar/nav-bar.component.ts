import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/module/usuario.module';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [
    StorageService]
})
export class NavBarComponent implements OnInit {
  @Input() isLoggedNavbar = false;
  @Output() submitNewCommentEvent = new EventEmitter<Component>();
  @Input() componentList: [];
  isCollapsed: boolean;
  usuarioIdentificado: Usuario;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private modalCommentService: NgbModal
  ) {
    this.isLogged();
    this.storageService.logChange.subscribe(
      (newState: boolean) => {
        this.isLoggedNavbar = newState;
      }
    );
  }

  ngOnInit(): void {
    this.usuarioIdentificado = new Usuario();
    this.isCollapsed = true;
    this.isLogged();
  }

  ngOnChanges(changes) {
    this.isLogged();
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
    this.isLogged();
    this.router.navigate(['/']);
  }
}
