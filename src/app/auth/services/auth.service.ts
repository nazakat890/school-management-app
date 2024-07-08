import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http:HttpClient) { }


login(credentials:any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials, {observe:'response'})
}

register(data:any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data)
}

logout(): void{
localStorage.removeItem('token')
}

getToken(): string {
  return localStorage.getItem('token') || ''
}




}
