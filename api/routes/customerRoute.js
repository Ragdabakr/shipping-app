import express from 'express';
import {getCustomers, saveCustomer,updateCustomer,enableDisableCustomer ,findCustomersByMonth, customerOrderDetails , getCustomerByName} from '../controller/customerController';
const router = express.Router();


router.get('/customer/list', getCustomers);
router.post('/customer/save', saveCustomer);
router.post('/customer/update', updateCustomer);
router.get('/customer/findCustomersByMonth', findCustomersByMonth);
router.get('/customer/customerOrderDetails/:customerId', customerOrderDetails);
router.post('/customer/enableDisableCustomer', enableDisableCustomer);
router.get('/customer/getCustomerIdByName/:customerName',getCustomerByName );
export default router;
