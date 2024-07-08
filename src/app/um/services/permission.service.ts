import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = `${environment.apiUrl}/permissions`;

  constructor(private http:HttpClient) { }

  getPermissions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPermissionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPermission(permission: any): Observable<any> {
    return this.http.post(this.apiUrl, permission);
  }

  updatePermission(id: string, permission: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, permission);
  }

  deletePermission(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
