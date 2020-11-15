import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Api} from '../api/api';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public api: Api) {}

  getUsers(params?: any) {
    return this.api.get('user/list');
  }
  editUserForm(params?: any) {
    return this.api.post('user/update', params);
  }
  createUserForm(params?: any) {
    return this.api.post('user/save', params);
  }
  disableUser(params?: any) {
    return this.api.post('user/enableDisableUser', params);
  }
  findUserById(userId :any) {
    return this.api.get(`user/${userId}`);
  }
  findUsersByMonth() {
    return this.api.get(`users/findUsersByMonth`);
  }
  forgotPassword(params?: any){
    return this.api.post('user/forgotpassword', params);
  }
  resetPassword(params?: any){
    debugger;
    return this.api.post('user/resetpassword', params);
  }
}
