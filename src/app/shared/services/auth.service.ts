import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  isLoggedIn() {
    return !!localStorage.getItem('session');
  }

  authorize(session: {
    accessToken: string
    tokenType: string
  }) {
    localStorage.setItem('session', JSON.stringify(session))
    this.router.navigate(['/dashboard'])
  }
  signOut() {
    localStorage.removeItem('session')
    this.router.navigate(['/auth'])
  }
}
