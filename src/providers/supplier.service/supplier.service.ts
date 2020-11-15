import { Injectable } from '@angular/core';
import {Api} from '../api/api';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(public api: Api) { }

  getSupplier(params?: any) {
    return this.api.get('supplier/list');
  }
  editSupplierForm(params?: any) {
        return this.api.post('supplier/update', params);

  }
  createSupplierForm(params?: any) {
    return this.api.post('supplier/save', params);
  }
  enableDisableSupplier(params?: any) {
    return this.api.post('supplier/enableDisableSupplier', params);
  }
  generateAPI_Key(params?: any) {
    return this.api.post('supplier/generateApiKey', params);
  }
  createSupplierOrderForm(params?: any) {
    debugger;
    return this.api.post('order/saveSupplierOrder', params);
  }
  getSupplierIdByName(supplierName:any){
    debugger;
    return this.api.get(`supplier/getSupplierIdByName/${supplierName}`);
  }
  getSuppliersOrders() {
    return this.api.get('suppliers/orders');
  }
  supplierOrderDetail(supplierId:any) {
    return this.api.get(`supplier/supplierOrderDetails/${supplierId}`);
  }


}
