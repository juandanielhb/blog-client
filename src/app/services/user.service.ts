import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_BASE = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login(authReq: any){
    return this.http.post(`${API_BASE}/login`, authReq);
  }

  signup(signupReq: any){
    return this.http.post(`${API_BASE}/signup`, signupReq);
  }

}
