import { Injectable } from '@angular/core';
import {Api} from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class CostumerService {

  constructor(public api: Api) { }

  getCustomer(params?: any) {
    return this.api.get('customer/list');
  }
  editCustomerForm(params?: any) {
    console.log("customer : ",params);

    // return this.api.post('customer/update', params);
    return this.api.post('customer/update', params);

  }
  createCustomerForm(params?: any) {
    return this.api.post('customer/save', params);
  }
  enableDisableCustomer(params?: any) {
    console.log(1235)
    return this.api.post('customer/enableDisableCustomer', params);
  }
  findCustomersByMonth() {
    return this.api.get(`customer/findCustomersByMonth`);
  }
  getCustomerOrders(){
    debugger;
    return this.api.get('customers/orders');
  }

  getCities(){
    return this.api.get('lookup/cities');
  }
  getOrderStatus(){
    return this.api.get('lookup/getOrderStatus');
  }
  getOrderTypes(){
    return this.api.get('lookup/orderTypes');
  }
  getCountries(){
    return this.api.get('lookup/countries');
  }
  getCitiesByCountryId(countryId:any){
    debugger;
    return this.api.get(`lookup/citiesByCountryId/${countryId}`);
  }
  getCustomerIdByName(customerName:any){
    debugger;
    return this.api.get(`customer/getCustomerIdByName/${customerName}`);
  }
  createCustomerOrderForm(params?: any) {
    debugger;
    return this.api.post('order/save', params);
  }
  customerOrderDetail(customerId:any) {
    return this.api.get(`customer/customerOrderDetails/${customerId}`);
  }
  getCustomersOrders() {
    return this.api.get('customers/orders');
  }
  getCountriesCode() {
    return this.api.get('countriesCode');
  }
  findOrdersByMonth(year :any) {
    return this.api.get(`customer/findOrdersByMonth/${year}`);
  }
 updateOrderForm(params?: any) {
    debugger;
    return this.api.post('order/update', params);
  }


}
