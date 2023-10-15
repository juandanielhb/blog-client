import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';

const API_BASE = 'http://localhost:8080/api/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(
    private http: HttpClient,
    private _jwtService: JwtService
  ) {
  }

  getHeaders() {
    return this._jwtService.getAuthorizationToken();
  }

  getAll() {
    return this.http.get(`${API_BASE}`, { headers: this.getHeaders() });
  }

  create(post: any) {
    return this.http.post(`${API_BASE}`, post, { headers: this.getHeaders() });
  }

  update(id: string, post: any) {
    return this.http.put(`${API_BASE}/${id}`, post, { headers: this.getHeaders() });
  }

  delete(id: string) {
    return this.http.delete(`${API_BASE}/${id}`, { headers: this.getHeaders() });
  }

}