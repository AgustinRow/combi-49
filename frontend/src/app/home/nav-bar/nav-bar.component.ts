import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
    private router: Router,
    private storageService: StorageService,
    private modalCommentService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLogged();
  }

  ngOnChanges(changes){
    this.isLogged();
  }

  isLogged(){
    if(this.storageService.getCurrentSession() != null){
      this.isLoggedNavbar = true;
    }
    else{
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
