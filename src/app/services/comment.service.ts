import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';

const API_BASE = 'http://localhost:8080/api/posts';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private _jwtService: JwtService
  ) {
  }

  getHeaders() {
    return this._jwtService.getAuthorizationToken();
  }

  getAll(postId: string) {
    return this.http.get(`${API_BASE}/${postId}/comments`, { headers: this.getHeaders()});
  }

  create(postId: string, comment: any) {
    return this.http.post(`${API_BASE}/${postId}/comments`, comment, { headers: this.getHeaders()});
  }

  update(postId: string, commentId: string, comment: any) {
    return this.http.put(`${API_BASE}/${postId}/comments/${commentId}`, comment, { headers: this.getHeaders()});
  }

  delete(postId: string, commentId: string) {
    return this.http.delete(`${API_BASE}/${postId}/comments/${commentId}`, { headers: this.getHeaders()});
  }

}