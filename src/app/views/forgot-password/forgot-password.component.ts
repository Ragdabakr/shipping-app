
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service/AuthService';
import {ToastrService} from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { UserService } from '../../../providers/user.service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formData ;
  loggedUser: any;
  constructor(private authService:AuthService ,
              private toastr:ToastrService ,
              private userService:UserService,
              private logger: NGXLogger , private router:Router){
  }

  ngOnInit() {
    this.formData = {};
  }

  forgotpassword(formData) {
    console.log('email >>>' , formData.email);
    if(!formData.email){
      this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
      this.logger.error('الرجاء ملئ جميع الحقول المطلوبة');
    }
    const  user = {
     email: formData.email,
    }
    this.userService.forgotPassword(user).subscribe((res :any) => {
      if (formData.valid) {
        this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
      }

        this.toastr.success('تم ارسال رابط استعادة كلمة المرور الي الايميل بنجاح');
    }),
    (err) => {
      this.logger.error('معلومات الدخول غير صحيحة');
      this.toastr.error('معلومات الدخول غير صحيحة');
      console.log(err);
    };
}

}
