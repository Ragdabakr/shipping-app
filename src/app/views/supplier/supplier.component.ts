import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { SupplierService } from '../../../providers/supplier.service/supplier.service';
import { LookupService } from '../../../providers/lookup.service/lookup.service';
import { UtilsService } from '../../../providers/Utils/utils.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../../../providers/auth.service/AuthService';
import { Supplier } from '../../../model/supplier.model';
import { async } from '@angular/core/testing';
import { CostumerService } from '../../../providers/customer.service/costumer.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  suppliers:Supplier[];
  totalSupplier: number;
  supplier: Supplier;
  loggedUser: string;
  update_by:string;
  created_by:string;
  newSupplierDialog: boolean;
  createSupplierForm: any;
  submitted : boolean;
  supplierDialog: boolean;
  editSupplierForm: any;
  SupplierDialog: boolean;
  ApiKeyDialog: boolean;
  cities:[];
  countriesCode=[];
  @ViewChild('api_key') api_key: ElementRef;


  supplierForm = this.fb.group ({
      supplier_fullname : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      supplier_email:['', [Validators.required , Validators.email]],
      supplier_phone_phone:['', [Validators.required , Validators.minLength(9),Validators.maxLength(11)]],
      supplier_phone_code:['', [Validators.required]],
      city_id:['', [Validators.required]],
      country_id:['', [Validators.required]],
    });

    newSupplierForm = this.fb.group ({
      supplier_fullname : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      supplier_email:['', [Validators.required , Validators.email]],
      supplier_phone_phone:['', [Validators.required , Validators.minLength(9),Validators.maxLength(11)]],
      supplier_phone_code:['', [Validators.required]],
      city_id:['', [Validators.required]],
      country_id:['', [Validators.required]]
    });
  countries: any;
  countryId: string;
  supplierId: any;
  detailsDialog: boolean;
  supplierOrderlength: any;
  supplierOrders=[];

  constructor(
    private supplierService:SupplierService,
    private lookupService:LookupService,
    private fb: FormBuilder,
    private toastr:ToastrService ,
    private authService:AuthService,
    private utileService:UtilsService,
    private customerService:CostumerService,

    ) { }

  ngOnInit(): void {
    this.getSupplier();
    this.getCountries();
    this.getCountryCode();
    // let data =  this.utileService.getCities();
    // console.log("data : ",data)
    this.loggedUser = this.authService.getUserName();
    this.created_by = this.authService.getUserName();
    this.update_by = this.authService.getUserName();
  }

  getCities(){
    this.lookupService.getCitiesList().subscribe(
      res =>{
        let data = res['data'];
        this.cities = data;
        },
        err =>{
        console.log(err);
        return err
      }
    )
  }

  getSupplier(){

    this.supplierService.getSupplier().subscribe(
      res =>{
        //debugger;
        let data = res['data'];
        this.suppliers = data;
        this.totalSupplier = this.suppliers.length;
       console.log('suppliers >>>',this.suppliers);
        },
        err =>{
        console.log(err);
      }
    )
  }
createNewSupplier(){
    this.newSupplierDialog = true;
}
submitCreateForm(newSupplierForm){
    console.log('newSupplierForm >>>',newSupplierForm.value);
    this.createSupplierForm = newSupplierForm.value;
    const createData= {
       supplier_fullname : this.createSupplierForm.supplier_fullname,
       created_by : this.created_by,
       supplier_email: this.createSupplierForm.supplier_email,
       supplier_phone: this.createSupplierForm.supplier_phone_phone + this.createSupplierForm.supplier_phone_code,
       city_id: this.createSupplierForm.city_id,
       country_id: this.createSupplierForm.country_id,

    }
    this.submitted = true;
      if (newSupplierForm.invalid) {
        this.validateAllFormFields(this.newSupplierForm); // Triger userForm validation
        this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
      } else {
         this.supplierService.createSupplierForm(createData).subscribe((data) =>{
         this.newSupplierDialog = false;
         this.toastr.success('تم اضافة المود بنجاح');
         this.getSupplier();
        },
        (error: HttpErrorResponse) =>{
          console.log('error >>>>>', error);
        if(error.error.error === 'Email already exist'){
         this.toastr.error(' الايميل مستخدم من قبل');
        }
        if(error.error.error === 'Supplier fullname already exist'){
         this.toastr.error('اسم الكامل مستخدم من قبل');
        }
     }),
      err =>{
        this.toastr.error(' لم يتم اضافة المورد  ');
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

hideSupplierDialog() {
        this.newSupplierDialog = false;
        this.submitted = false;
}
editSupplier(supplier: Supplier) {
        console.log('supplier >>>',supplier);
        this.supplier = supplier;
        this.supplierDialog = true;
        this.supplierForm.patchValue({
          supplier_fullname : supplier.supplier_fullname,
          supplier_email: supplier.supplier_email,
          supplier_phone: supplier.supplier_phone,
          city_id: supplier.city_id,

         });
         console.log('supplierform',this.supplierForm);
}
      // submit edit customer
submitEditSupplierForm(supplierForm ,supplierId){
        this.editSupplierForm = supplierForm.value;
        const editData= {
          supplier_id :  supplierId ,
          supplier_fullname : this.editSupplierForm.supplier_fullname,
          supplier_email: this.editSupplierForm.supplier_email,
          supplier_phone: this.editSupplierForm.supplier_phone_phone + this.editSupplierForm.supplier_phone_code,
          city_id: this.editSupplierForm.city_id,
          country_id: this.editSupplierForm.country_id,
          update_by: this.update_by,
        }
        console.log("supplier :",supplierForm.value)
        this.submitted = true;
          if (supplierForm.invalid) {
            this.validateAllFormFields(this.supplierForm); // Triger userForm validation
            this.toastr.error('الرجاء ملئ جميع الحقول المطلوبة');
          } else {
             this.supplierService.editSupplierForm(editData).subscribe((data) =>{
             this.supplierDialog= false;
             this.toastr.success('تم تعديل المورد بنجاح');
             this.getSupplier();
         }),
          err =>{
            this.toastr.error(' لم يتم تعديل المورد  ');
             console.log('errorr',err);
           }
          }
}
hideDialog(){
          this.supplierDialog = false;
          this.submitted = false;
}
disableSupplier(supplierId){
          //  console.log(123)

            const disableSupplierData = {
               active : 0 ,
               supplierId :supplierId,
               updatedBy :this.loggedUser
            };

            this.supplierService.enableDisableSupplier(disableSupplierData).subscribe((data) =>{
              this.getSupplier();
             this.toastr.success('تم تعديل  بنجاح');
            }),
             err =>{
               this.toastr.error(' لم يتم تعديل العميل');
                 console.log(err);
              }
}
enableSupplier(supplierId){
  //  console.log(123)

    const disableSupplierData = {
       active : 1 ,
       supplierId :supplierId,
       updatedBy :this.loggedUser
    };

    this.supplierService.enableDisableSupplier(disableSupplierData).subscribe((data) =>{
      this.getSupplier();
     this.toastr.success('تم تعديل  بنجاح');
    }),
     err =>{
       this.toastr.error(' لم يتم تعديل العميل');
         console.log(err);
      }
}
generateAPI_Key(supplierId){
            console.log('SuuplierID >>>' , supplierId);
            const SupplierData ={
               supplierId :supplierId,
            }
            this.supplierService.generateAPI_Key(SupplierData).subscribe((data) =>{
              this.getSupplier();
             this.toastr.success('تم تعديل  بنجاح');
            }),
             err =>{
              this.toastr.error(' لم يتم تعديل العميل');
                 console.log(err);
               }
}

showApiKey(supplier){
  this.supplier = supplier;
  this.ApiKeyDialog = true;
}
CopyApiKey(){
  const textarea = document.createElement('textarea');
  textarea.value = this.api_key.nativeElement.value;
  // console.log(textarea.value)
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

hideApiDialog(){
  this.ApiKeyDialog = false;
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
    // Supplier Order
    supplierOrder(supplierId) {
      this.supplierId= supplierId;
      console.log('supplierId>>>' ,this.supplierId);
      this.detailsDialog = true;
      this.supplierService.supplierOrderDetail(this.supplierId).subscribe(
        res =>{
          //debugger;
          let data = res['data'];
          this.supplierOrders = data;
          this.supplierOrderlength= this.supplierOrders.length;
          console.log('supplierOrders>>>',this.supplierOrders);
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

    hideSupplierDialogDatails(){
      this.detailsDialog = false;
    }

}
