import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service/AuthService';
import {ToastrService} from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
  formData ;
  loggedUser: any;
  constructor(private authService:AuthService ,
              private toastr:ToastrService ,
              private logger: NGXLogger , private router:Router){
  }

  ngOnInit() {
    this.formData = {};
  }

  login(formData) {
    if(!formData.email || !formData.password){
      this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
      this.logger.error('الرجاء ملئ جميع الحقول المطلوبة');
    }
    const  user = {
     email: formData.email,
     password: formData.password,
    }
    this.authService.signIn(user).subscribe((res :any) => {
      if (res == null){
        this.toastr.error('الايميل أو كلمة المرور غير صحيحة');
        this.logger.error('الايميل أو كلمة المرور غير صحيحة');
      }
      console.log(res);
      this.loggedUser = res.data;
      localStorage.setItem('access_token',res.data.token );
      localStorage.setItem('loggedUser',JSON.stringify(this.loggedUser));
      localStorage.setItem('loggedUserUsername',res.data.username);
      localStorage.setItem('loggedUserId',res.data.user_id);
      this.logger.debug('تم الدخول بنجاح ');
      this.router.navigate(['/'])
    },
    (err) => {
      this.logger.error('معلومات الدخول غير صحيحة');
      this.toastr.error('معلومات الدخول غير صحيحة');
      console.log(err);
    });
}

forgotPassword(){
  this.router.navigate(['/forgotpassword']);
}
}
