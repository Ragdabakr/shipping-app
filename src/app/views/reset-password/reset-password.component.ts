
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service/AuthService';
import {ToastrService} from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../providers/user.service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  formData ;
  loggedUser: any;
  token: any;
  constructor(private authService:AuthService ,
              private toastr:ToastrService ,
              private userService:UserService,
              private activatedRoute: ActivatedRoute,
              private logger: NGXLogger , private router:Router){
  }

  ngOnInit() {
    this.formData = {};
    this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        const email = param['email'];
        this.token = param['token'];
      });
  }

  resetpassword(formData) {
    if(!formData.password){
      this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
      this.logger.error('الرجاء ملئ جميع الحقول المطلوبة');
    }
    const  user = {
     password: formData.password,
     token:this.token,
    }
    this.userService.resetPassword(user).subscribe((res :any) => {
      if (res == null){
        this.toastr.error('كلمة المرور مطلوبة');
      }else{
      this.toastr.success('تم تحديث كلمة المرور بنجاح');
      }
    },
    (err) => {
      this.logger.error('معلومات الدخول غير صحيحة');
      this.toastr.error('معلومات الدخول غير صحيحة');
      console.log(err);
    });
}

}
