import { Component, OnInit } from '@angular/core';
import { CostumerService } from '../../../providers/customer.service/costumer.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../../../providers/auth.service/AuthService';
import { Customer } from '../../../model/customer.model';
import { LookupService } from '../../../providers/lookup.service/lookup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:Customer[];
  totalCustomer: number;
  customer: Customer;
  customerDialog: boolean;
  editCustomerForm: any;
  submitted:any;
  newCustomerDialog: boolean;
  createCustomerForm: any;
  loggedUser: string;
  update_by:string;
  created_by:string;
  cities:[];
  customerId :any;
  detailsDialog:boolean;
  countryId: string;
  countries=[];
  countriesCode = [];
  allCities = [];
  customerOrder: any;
  customerOrderlength;

  constructor(
    private customerService:CostumerService,
    private fb: FormBuilder,
    private toastr:ToastrService ,
    private authService:AuthService,
    private lookupService:LookupService,) { }

customerForm = this.fb.group ({
  customer_fullname : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
  customer_email:['', [Validators.required , Validators.email]],
  customer_phone_1:['', [Validators.required , Validators.minLength(10),Validators.maxLength(50)]],
  customer_phone_2:['', [Validators.required , Validators.minLength(10),Validators.maxLength(50)]],
  city_id:['', [Validators.required]],
  country_id:['', [Validators.required]],
});

newCustomerForm = this.fb.group ({
  username : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  customer_fullname : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
  password : ['', [Validators.required, Validators.minLength(8)]],
  customer_email:['', [Validators.required , Validators.email]],
  customer_phone_1_phone:['', [ Validators.minLength(10),Validators.maxLength(50)]],
  customer_phone_1_code:['', [Validators.minLength(10),Validators.maxLength(50)]],
  customer_phone_2_phone:['', [ Validators.minLength(10),Validators.maxLength(50)]],
  customer_phone_2_code:['', [ Validators.minLength(10),Validators.maxLength(50)]],
  city_id:['', [Validators.required]],
  country_id:['', [Validators.required]],

});
  ngOnInit(): void {
    this.getCustomer();
    this.getCountries();
    this.getCountryCode();
    this.loggedUser = this.authService.getUserName();
    this.created_by = this.authService.getUserName();
    this.update_by = this.authService.getUserName();
  }

  getCustomer(){
    this.customerService.getCustomer().subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        // console.log("data :",data);
        this.customers = data;
        this.totalCustomer = this.customers.length;
        console.log('customers >>>',this.customers);
        },
        err =>{
        console.log(err);
      }
    )
  }

  // Get countries
  getCountries(){
    this.customerService.getCountries().subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.countries = data;
        console.log('countries >>>',this.countries);
        },
        err =>{
        console.log(err);
      }
    )
  }
  onCountryChange(country: string): void {
    this.countryId = country;
    this.customerService.getCitiesByCountryId(this.countryId).subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.cities = data;
        console.log('cities >>>',this.cities);
        },
        err =>{
        console.log(err);
      }
    )
  }
  onCountryEditChange(country: string): void {
    this.countryId = country;
    this.customerService.getCitiesByCountryId(this.countryId).subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.allCities = data;
        console.log('ALLcities >>>',this.cities);
        },
        err =>{
        console.log(err);
      }
    )
  }
  // Get Country Code
  getCountryCode(){
    this.customerService.getCountriesCode().subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.countriesCode = data;
        console.log('countriesCode >>>',this.countriesCode);
        },
        err =>{
        console.log(err);
      }
    )
  }
  createNewCustomer(){
    this.newCustomerDialog = true;
  }

  // Submit Create user Form
  submitCreateForm(newCustomerForm){
    // console.log('newCustomerForm >>>',newCustomerForm.value);
    this.createCustomerForm = newCustomerForm.value;
    const createData= {
       customer_fullname : this.createCustomerForm.customer_fullname,
       customer_email: this.createCustomerForm.customer_email,
       created_by:this.created_by,
       customer_phone_1:  this.createCustomerForm.customer_phone_1_code + this.createCustomerForm.customer_phone_2_phone,
       customer_phone_2: this.createCustomerForm.customer_phone_2_code + this.createCustomerForm.customer_phone_2_phone,
       city_id: this.createCustomerForm.city_id,
       country_id:this.createCustomerForm.country_id,
       username: this.createCustomerForm.username,
       password: this.createCustomerForm.password
    }
    this.submitted = true;
      if (newCustomerForm.invalid) {
        this.validateAllFormFields(this.newCustomerForm); // Triger userForm validation
        this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
      } else {
         this.customerService.createCustomerForm(createData).subscribe((data) =>{
         this.newCustomerDialog = false;
         this.toastr.success('تم اضافة العميل بنجاح');
         this.getCustomer();
        },
        (error: HttpErrorResponse) =>{
          console.log('error >>>>>', error);
        if(error.error.error === 'Email already exist'){
         this.toastr.error(' الايميل مستخدم من قبل');
        }
        if(error.error.error === 'Customer full name already exist'){
         this.toastr.error('اسم الكامل مستخدم من قبل');
        }
        if(error.error === 'Customer full name already exist'){
          this.toastr.error('oاسم الكامل مستخدم من قبل');
         }
     }),
      err =>{
        this.toastr.error(' لم يتم اضافة العميل  ');
         console.log(err);
       }
      }
    }
  // Customer Order
    customOrder(customerId) {
      this.customerId = customerId;
      console.log('customerId>>>' ,this.customerId);
      this.detailsDialog = true;
      this.customerService.customerOrderDetail(this.customerId).subscribe(
        res =>{
          //debugger;
          let data = res['data'];
          this.customerOrder = data;
          this.customerOrderlength= this.customerOrder.length;
          console.log('customerorder >>>',this.customerOrder);
          },
          err =>{
          console.log(err);
        }
       ),
        err =>{
          this.toastr.error('هناك خطأ ما');
            console.log(err);
         }
    }

  // edit customer
  editCustomer(customer: Customer) {
     console.log('customerrr >>>',customer);
    this.customer = customer;
    this.customerDialog = true;
    this.customerForm.patchValue({
      customer_fullname : customer.customer_fullname,
      customer_email: customer.customer_email,
      customer_phone_1: customer.customer_phone_1,
      customer_phone_2: customer.customer_phone_2,
      city_id: customer.city_id,
      // country_id: customer.country_id,

     });
     console.log('customerform',this.customerForm);
  }


  // submit edit customer
  submitEditCustomerForm(customerForm ,customerId){
    this.editCustomerForm = customerForm.value;
    const editData= {
      customer_id :   customerId ,
      customer_fullname : this.editCustomerForm.customer_fullname,
      customer_email: this.editCustomerForm.customer_email,
      customer_phone_1:  this.editCustomerForm.customer_phone_1,
      customer_phone_2: this.editCustomerForm.customer_phone_2,
      city_id: this.editCustomerForm.city_id,
      country_id: this.editCustomerForm.country_id,
      update_by: this.update_by,
    }
    console.log(customerForm.value)
    this.submitted = true;
      if (customerForm.invalid) {
        this.validateAllFormFields(this.customerForm); // Triger userForm validation
        this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
      } else {
         this.customerService.editCustomerForm(editData).subscribe((data) =>{
         this.customerDialog = false;
         this.toastr.success('تم تعديل العميل بنجاح');
         this.getCustomer();
      }),
      err =>{
        this.toastr.error(' لم يتم تعديل العميل  ');
         console.log(err);
       }
      }
    }

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
  //list customer

  hideCustomerDialog() {
    this.newCustomerDialog = false;
    this.getCustomer();
  }
  hideDialog() {
    this.customerDialog = false;
    this.getCustomer();
  }

disableCustomer(customerId){
//  console.log(123)

  const disableCustomerData = {
     active : 0 ,
     customerId :customerId,
     updatedBy :this.loggedUser
  };

  this.customerService.enableDisableCustomer(disableCustomerData).subscribe((data) =>{
   this.getCustomer();
   this.toastr.success('تم تعديل  بنجاح');
  }),
   err =>{
     this.toastr.error(' لم يتم تعديل العميل');
       console.log(err);
    }
}

enableCustomer(customerId){
  //console.log('userId >>>' , userId);
  const disableCustomerData ={
     active : 1 ,
     customerId :customerId,
     updatedBy :this.loggedUser
  }
  this.customerService.enableDisableCustomer(disableCustomerData).subscribe((data) =>{
   window.location.reload();
   this.toastr.success('تم تعديل  بنجاح');
  }),
   err =>{
    this.toastr.error(' لم يتم تعديل العميل');
       console.log(err);
     }
   }

}


