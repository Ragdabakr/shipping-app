import {Injectable} from '@angular/core';
import {Api} from '../api/api';
import {HttpParams, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordCheckerService {

  constructor(public api: Api) {}

  changePassword(userId: any, oldpassword: any, newpassword: any, confirmpassword: any) {
    console.log('Calling Service', 'userId=', userId, ' newpassword=',
      newpassword, ' oldpassword=', oldpassword, ' confirmpassword=', confirmpassword);

    let body = {
      userId: userId,
      oldPassword: oldpassword,
      confirmNewPassword: confirmpassword,
      newPassword: newpassword
    }
    return this.api.post('user/password/change', body);
  }
}
