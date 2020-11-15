import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../providers/user.service/user.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../../../providers/auth.service/AuthService';
import { User } from '../../../model/user.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[];
  selectedUser: User;
  cols: { field: string; header: string; }[];
  totalUsers: number;
  length:any;
  newUser: boolean;
  displayDialog: boolean;
  user: User;
  userDialog: boolean;
  submitted:any;
  errors:any;
  userTypes = [
    { user_type_name:'مستخدم',user_type_code:'مستخدم'},
    { user_type_name:'مشرف',user_type_code:'مشرف'},
  ];

  editUserForm: any;
  newUserDialog: boolean;
  createUserForm: any;
  loggedUser: string;
  createCustomerForm: any;

  constructor(
    private userService:UserService,
    private fb: FormBuilder,
    private toastr:ToastrService ,
    private authService:AuthService) { }

   // Update User Form
  userForm = this.fb.group ({
    username : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    full_name : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    email: ['', [Validators.required , Validators.email]],
    user_type_code: ['', Validators.required],
    updated_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });
  // Create New User Form
  newUserForm = this.fb.group ({
    username : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    full_name : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    email: ['', [Validators.required , Validators.email]],
    user_type_code: ['', Validators.required],
    password: ['',[Validators.required, Validators.minLength(8)]],
    created_by: ['', [Validators.required]],

  });



  ngOnInit(): void {
    this.getUsers();

    this.loggedUser = this.authService.getUserName();
    //console.log( 'loggedUser >>',this.loggedUser);
    this.cols = [
      { field: 'username', header: 'اسم المستخدم' },
      { field: 'full_name', header: 'الاسم بالكامل' },
      { field: 'email', header: ' البريد الالكتروني' },
      { field: 'user_type_code', header: 'نوع المستخدم' },
      { field: 'created_on', header: 'تاريخ التسجيل' },
      { field: 'active', header: 'التفعيل' },
  ];


  }
// Get Users
    getUsers(){
    this.userService.getUsers().subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.users = data;
        this.totalUsers = this.users.length;
        console.log('users >>>',this.users);
        },
        err =>{
        console.log(err);
      }
    )
  }


// update userform with user values
editUser(user: User) {
  console.log("user",user);
  this.user = user;
  this.userDialog = true;
  this.userForm.patchValue({
    username : user.username,
    full_name : user.full_name,
    email : user.email,
    user_type_code : user.user_type_code,
    updatedBy : user.created_by,
   });
   console.log('userform',this.userForm);
}
hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}

// map userform with new data
mapValues() {
 this.user.username = this.userForm.value.username;
 this.user.full_name = this.userForm.value.username;
 this.user.email = this.userForm.value.username;
 this.user.user_type_code = this.userForm.value.user_type_code;
 this.user.created_by = this.userForm.value.created_by;
}
// Submit Edit user Form
submitEdituserForm(userForm ,userId){
  this.editUserForm = userForm.value;
  const editData= {
     userId :   userId ,
     username :  this.editUserForm.username,
     fullName : this.editUserForm.full_name,
     userTypeCode : this.editUserForm.user_type_code,
     updatedBy : this.editUserForm.updated_by,
     email: this.editUserForm.email,
  }
  this.submitted = true;
    if (userForm.invalid) {
      this.validateAllFormFields(this.userForm); // Triger userForm validation
      this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
    } else {
       this.userService.editUserForm(editData).subscribe((data) =>{
       this.userDialog = false;
       this.getUsers();
       this.toastr.success('تم تعديل المستخدم بنجاح');
    }),
    err =>{
      this.toastr.error(' لم يتم تعديل المستخدم  ');
       console.log(err);
     }
    }
  }


  createNewUser(){
    this.newUserDialog = true;
    this.getUsers();
  }
  hideUserDialog() {
    this.newUserDialog = false;
    this.getUsers();
  }

  // Submit Create user Form
  submitCreateUserForm(newUserForm){
  //console.log('newUserForm >>>',newUserForm.value);
  this.createUserForm = newUserForm.value;
  const createDataUser= {
     username :  this.createUserForm.username,
     fullName : this.createUserForm.full_name,
     userTypeCode : this.createUserForm.user_type_code,
     createdBy : this.createUserForm.created_by,
     password:this.createUserForm.password,
     email: this.createUserForm.email,
  }

  this.submitted = true;
    if (newUserForm.invalid) {
      this.validateAllFormFields(this.newUserForm); // Triger userForm validation
      this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
    } else {
       this.userService.createUserForm(createDataUser).subscribe((data) =>{
       this.newUserDialog = false;
       this.toastr.success('تم اضافة المستخدم بنجاح');
       this.getUsers();
       },
       (error: HttpErrorResponse) =>{
       if(error.error.error === 'Email already exist'){
        this.toastr.error(' الايميل مستخدم من قبل');
       }
       if(error.error.error.code === '23505'){
        this.toastr.error('  اسم المستخدم مستخدم من قبل ');
       }
    }),
    err =>{
      // this.toastr.error(' لم يتم اضافة المستخدم  ');
       console.log("error>>>>",err);
     }
    }
  }

// To validate all form fields, we need to iterate throughout all form controls:
validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
  }

  // Disable & Enable user

  // Disable User
  disableUser(userId){
    console.log('userId' ,userId);
   const disableUserData ={
      active : 0 ,
      userId :userId,
      updatedBy :this.loggedUser
   }
   this.userService.disableUser(disableUserData).subscribe((data) =>{
   this.getUsers();
    this.toastr.success('تم تعديل  بنجاح');
   }),
    err =>{
      this.toastr.error(' لم يتم تعديل المستخدم');
        console.log(err);
      }
    }

  //Enable user
  enableUser(userId){
    //console.log('userId >>>' , userId);
    const disableUserData ={
       active : 1 ,
       userId :userId,
       updatedBy :this.loggedUser
    }
    this.userService.disableUser(disableUserData).subscribe((data) =>{
      this.getUsers();
     this.toastr.success('تم تعديل المستخدم بنجاح');
    }),
     err =>{
      this.toastr.error(' لم يتم تعديل المستخدم');
         console.log(err);
       }
     }


  //Global Search
  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.displayDialog = true;
}

  cloneUser(u: User): User {

    for (let prop in u) {
        this.user[prop] = u[prop];
    }
    return this.user;

  }

}
