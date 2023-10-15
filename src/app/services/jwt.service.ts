import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly storageKey = 'auth_token';

  setToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.clear();
  }

  getAuthorizationToken(){
    let jwt = 'Bearer ' + this.getToken();
    return new HttpHeaders().set('Authorization', jwt);    
  }
}
