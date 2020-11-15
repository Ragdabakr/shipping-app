import {Component, ViewChild} from '@angular/core';
import {ModalModule, BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {currentPasswordValidator} from '../../validators/current-password-validator';
import {PasswordCheckerService} from '../../../providers/change-password/password-checker.service';
import {AlertComponent} from 'ngx-bootstrap/alert';
import {HttpResponse} from '@angular/common/http';
import { AuthService } from '../../../providers/auth.service/AuthService';
import { User } from '../../../model/user.model';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  @ViewChild('infoModal') public infoModal: ModalDirective;
  title = 'Change Password ..';
  alerts: any[] = [{}];

  changePasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private passwordSvc: PasswordCheckerService,private auth : AuthService) {
    this.createForm();
  }

  createForm() {
    this.changePasswordForm = this.fb.group({
      //userid: ['', Validators.required],
      oldpassword: ['', [Validators.required]],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }
  revert() {
    this.changePasswordForm.reset();
  }
  submitPasswordChangeRequest() {
    let user:User;
    user = JSON.parse(localStorage.getItem('loggedUser'));
    this.passwordSvc.changePassword(user.user_id, this.oldpassword.value,
      this.newpassword.value, this.confirmpassword.value).subscribe(
      res =>{
          const msg = res['data'];
        this.alerts.push({
          type: 'info', msg: msg, timeout: 50000
        });
        },
        err =>{
          console.log(err);
          const msg = err;
        this.alerts.push({
          type: 'error', msg: err.error, timeout: 50000
        });
      }
    )

    this.revert();
  }
  get oldpassword() {
    return this.changePasswordForm.get('oldpassword');
  }
   get newpassword() {
    return this.changePasswordForm.get('newpassword');
  }
  get confirmpassword() {
    return this.changePasswordForm.get('confirmpassword');
  }
  // Alert
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }




}
