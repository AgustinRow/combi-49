import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../module/usuario.module';
import { Session } from '../module/session.module';

@Injectable()
export class StorageService {
  private localStorageService;
  private currentSession : Session = null;
  @Output() logChange = new EventEmitter<boolean>();

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;    
    this.setCurrentToken(session.token);
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }
  
  setCurrentToken(token: string): void {
    this.localStorageService.setItem('access_token', JSON.stringify(token));
  }

  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }
  
  getCurrentUser(): Usuario {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };
  
  isAuthenticated(): boolean {
    return (this.getCurrentUser() != null) ? true : false;
  };
  
  logout(): void{
    this.removeCurrentSession();
  }
}
