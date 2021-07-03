import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../module/usuario.module';
import { Session } from '../module/session.module';

@Injectable()
export class StorageService {
  private localStorageService;
  @Output() logChange = new EventEmitter<boolean>();

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.localStorageService.setItem('logChange', this.logChange);
  }

  setCurrentSession(session: Session): void {
    this.localStorageService.setItem('currentSession', JSON.stringify(session));
  }
  
  setCurrentToken(token: string): void {
    this.localStorageService.setItem('access_token', JSON.stringify(token));
  }

  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentSession');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.loadSessionData();
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentSession');
  }
  
  getCurrentUser(): Usuario {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };
  
  isAuthenticated(): boolean {
    return (this.getCurrentUser() != null) ? true : false;
  };
  
  logout(): void{
    this.logChange.emit(false);
    this.removeCurrentSession();
    this.logChange.emit(false);
  }

  login(session: Session): void{
    this.setCurrentSession(session);
    this.logChange.emit(true);
  }
}
