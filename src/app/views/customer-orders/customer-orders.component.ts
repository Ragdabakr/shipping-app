

import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../providers/user.service/user.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../../../providers/auth.service/AuthService';
import { User } from '../../../model/user.model';
import { CostumerService } from '../../../providers/customer.service/costumer.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Order } from '../../../model/order.model';


@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  customersOrders:Order[];
  selectedUser;
  cols: { field: string; header: string; }[];
  totalUsers: number;
  length:any;
  newUser: boolean;
  displayDialog: boolean;
  userDialog: boolean;
  submitted:any;
  errors:any;
  newUserDialog: boolean;
  createUserForm: any;
  orderDialog: boolean;
  detailsDialog: boolean;
  order: any;
  cities = [];
  OrderStatus=[];
  orderTypes=[];
  users=[];
  customers=[];
  createForm:any;
  countries=[];
  countryId;
  customerName;
  deliverCities=[];
  deliverCountryId:any;
  customerId: any;
  countriesCode=[];
  customersOrder: User;
  selectedOrder;
  orderStatusDialog: boolean;



  constructor(
    private userService:UserService,
    private customerService:CostumerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr:ToastrService ,
    private authService:AuthService) { }

    statusOrderForm = this.fb.group ({
     status_code : ['', [Validators.required]],
    });

  // Create New User Form
  neworderForm = this.fb.group ({
    order_type : ['', [Validators.required]],
    service_code: ['', [Validators.required ]],
    status_code: ['', Validators.required],
    order_weight: ['', Validators.required],
    order_price: ['', Validators.required],
    order_date : ['', [Validators.required]],
    sender_date : ['', [Validators.required]],
    delivery_date: ['', [Validators.required ]],
    customer_id: [''],
    sender_name: ['', Validators.required],
    sender_mobile_phone : ['', [Validators.required]],
    sender_mobile_code : ['', [Validators.required]],
    sender_lat_lng : ['', [Validators.required]],
    sender_city_id: ['', [Validators.required ]],
    deliver_to_name: ['', Validators.required],
    deliver_to_mobile_phone : ['', [Validators.required]],
    deliver_to_mobile_code : ['', [Validators.required]],
    deliver_to_lat_lng : ['', [Validators.required ]],
    deliver_to_city_id: ['', [Validators.required ]],
    deliver_country_id: ['', [Validators.required ]],
    sender_country_id: ['', [Validators.required ]],
  });

  ngOnInit(): void {
    this.getCustomersOrders();
    this.getOrderStatus();
    this.getOrderTypes();
    this.getUsers();
    this.getCustomers();
    this.getCountries();
    this.getCountryCode();



    this.cols = [
      { field: 'sender_name', header:  'اسم المرسل ' },
      { field: 'sender_mobile', header: 'هاتف المرسل' },
      { field: 'order_date', header: 'تاريخ الطلب' },
      { field: 'sender_date', header: ' تاريخ الارسال' },
      { field: 'delivery_date', header: 'تاريخ التسليم' },
  ];

  }

  // Get Users
  getUsers(){
    this.userService.getUsers().subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.users = data;
        console.log('users >>>',this.users);
        },
        err =>{
        console.log(err);
      }
    )
  }
  onCustomerChange(customer: string): void {
    this.customerName = customer;
    console.log('customer' ,this.customerName );
    this.customerService.getCustomerIdByName(this.customerName).subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.customerId = data[0].customer_id;
        console.log('customerId >>>',this.customerId);
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
  onDeliverCountryChange(country: string): void {
    this.deliverCountryId = country;
    this.customerService.getCitiesByCountryId(this.deliverCountryId).subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.deliverCities = data;
        console.log('deliverCities >>>', this.deliverCities);
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
  // Get Customers
  getCustomers(){
    this.customerService.getCustomer().subscribe(
      res =>{
        let data = res['data'];
        this.customers = data;
        console.log('this.customers >>>',this.customers);
        },
        err =>{
        console.log(err);
      }
    )
  }

// Get Users
    getCustomersOrders(){
    this.customerService.getCustomersOrders().subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.customersOrders = data;
        console.log('customersOrders >>>',this.customersOrders);
        },
        err =>{
        console.log(err);
      }
    )
  }

    // Get Order Services
    getOrderStatus(){
      this.customerService.getOrderStatus().subscribe(
        res =>{
          //debugger;
          let data = res['data'];
          this.OrderStatus = data;
          console.log('orderStatus >>>',this.OrderStatus);
          },
          err =>{
          console.log(err);
        }
      )
    }

      // Get Order Types
  getOrderTypes(){
    this.customerService.getOrderTypes().subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.orderTypes = data;
        console.log('orderTypes >>>',this.orderTypes);
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

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }


  details(order){
  this.detailsDialog = true;
  this.order = order;
  console.log("this.order>>>",this.order);
  }


  createNewCustomerOrder(){
    this.newUserDialog = true;
  }
  hideUserDialog() {
    this.newUserDialog = false;
    this.submitted = false;
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

  // Submit Create order Form
  submitCreateOrderForm(neworderForm){
  this.createForm = neworderForm.value;
  const createData= {
    customerId : this.customerId,
    orderType : this.createForm.order_type,
    serviceCode : this.createForm.service_code,
    statusCode:this.createForm.status_code,
    orderWeight: this.createForm.order_weight,
    orderPrice :  this.createForm.order_price,
    orderDate : this.createForm.order_date,
    senderDate : this.createForm.sender_date,
    deliveryDate : this.createForm.delivery_date,
    senderName : this.createForm.sender_name,
    senderCityId :  this.createForm.sender_city_id,
    senderMobile : this.createForm.sender_mobile_code + this.createForm.sender_mobile_phone,
    senderLatLng : this.createForm.sender_lat_lng,
    deliverToName:this.createForm.deliver_to_name,
    deliverToMobile: this.createForm.deliver_to_mobile_code + this.createForm.deliver_to_mobile_phone,
    deliverToLatLng :  this.createForm.deliver_to_lat_lng,
    deliverToCityId : this.createForm.deliver_to_city_id,
    deliverCountryId:this.createForm.deliver_country_id,
    senderCountryId:this.createForm.sender_country_id,
  }
  this.submitted = true;
    if (neworderForm.invalid) {
      this.validateAllFormFields(this.neworderForm); // Triger userForm validation
      this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
    } else {
       this.customerService.createCustomerOrderForm(createData).subscribe((data) =>{
       this.newUserDialog = false;
       this.getCustomersOrders();
       this.toastr.success('تم اضافة طلب جديد بنجاح');
    }),
    err =>{
      this.toastr.error(' لم يتم اضافة المستخدم  ');
       console.log(err);
     }
    }
  }

  editOrderStatus(order){
    this.orderStatusDialog = true;
     this.order = order;
     this.statusOrderForm.patchValue({
      status_code : order.status_code,
       order_id :order.order_id
      });
  }

  hideOrderStatusDialog() {
    this.orderStatusDialog = false;
    this.submitted = false;
  }


  submitorder(statusOrderForm ,orderId){
    const editData= {
      orderId :   orderId ,
     statusCode : statusOrderForm.value.status_code
    }
    this.customerService.updateOrderForm(editData).subscribe((data) =>{
      this.orderStatusDialog = false;
      this.getCustomersOrders()
      this.toastr.success(' تم تعديل الطلب بنجاح');
   }),
   err =>{
     this.toastr.error(' م يتم تعديل الطلب');
      console.log(err);
    }
  }

}
