import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

saveToken(token?:string): void {
  if(!token) return
  sessionStorage.setItem('token', window.btoa(token))
}


getToken(): string | null{
  const token = sessionStorage.getItem('token')
  if(token){
    try {
      return window.atob(token)
    }
    catch(error){
      return null;
    }
  }
  return null;
 }

}
