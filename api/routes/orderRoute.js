import express from 'express';
import {saveOrder , getCustomersOrders , findOrdersByMonth , updateOrder ,getSuppliersOrders , saveSupplierOrder}  from '../controller/orderController';

const router = express.Router();

router.post('/order/save', saveOrder);
router.post('/order/saveSupplierOrder', saveSupplierOrder);
router.get('/customers/orders', getCustomersOrders);
router.get('/suppliers/orders', getSuppliersOrders);
router.post('/order/update', updateOrder);
router.get('/customer/findOrdersByMonth/:year', findOrdersByMonth);

export default router;
