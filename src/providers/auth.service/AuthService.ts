import { Injectable } from '@angular/core';
import { Api } from '../api/api';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
export  interface  User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api: Api) { }

  signIn(params?: any) {
    //debugger;
    return this.api.post('login', params);
  }

  public isLoggedIn(){
    return localStorage.getItem('access_token') !== null;
  }

  public logout(){
    localStorage.removeItem('access_token');
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public getUserName(): string {
    return localStorage.getItem('loggedUserUsername');
  }

  public getUserId(): string {
    return localStorage.getItem('loggedUserId');
  }

  public getLoggedInUser(): string {
    return localStorage.getItem('loggedUser');
  }




}
