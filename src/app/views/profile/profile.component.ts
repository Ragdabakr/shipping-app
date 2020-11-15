import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../providers/user.service/user.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../../../providers/auth.service/AuthService';
import { User } from '../../../model/user.model';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  userId:any;
  newUsername;
  newFullname;
  loggedUser: string;
  constructor(
    private authService:AuthService ,
    private userService:UserService ,
    private toastr:ToastrService ,
    private logger: NGXLogger
    ) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getUserName();
    this.userId = this.authService.getUserId();
    this.getUser();
  }

 getUser(){
   this.userService.findUserById(this.userId).subscribe((res) =>{
    if (res == null){
      this.toastr.error('لا توجد معلومات لهذا المستخدم');
      this.logger.error('لا توجد معلومات لهذا المستخدم');
    }
      let data = res['data'];
      this.user = data;
      },
      err =>{
        this.toastr.error(err);
      this.logger.error(err);
    }
  )
}

//  Edit User Username & Full name
updateUser(user){
  const editData= {
     userId :   user.user_id ,
     email:user.email,
     userTypeCode:user.user_type_code,
     updatedBy:this.loggedUser,
     username : user.username,
     fullName:user.full_name
  }
  if(this.newFullname){
    editData.fullName = this.newFullname;
  }
  if(this.newUsername){
    editData.username = this.newUsername;
  }
  console.log("editData",editData);
       this.userService.editUserForm(editData).subscribe((data) =>{
       this.getUser();
       this.toastr.success('تم تعديل المستخدم بنجاح');
    }),
    err =>{
      this.toastr.error(' لم يتم تعديل المستخدم  ');
      this.logger.error('لم يتم تعديل المستخدم  ');
       console.log(err);
     }
    }

  }

