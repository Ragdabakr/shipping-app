
import moment from "moment";
import dbQuery from "../db/dbQuery";
import queries from "../db/queries";
import { dateFormat } from "../helpers/utils";
import { errorMessage, successMessage, status } from "../helpers/status";
import {
  isEmpty,isValidEmail,isValidatePassword,
} from '../helpers/validations';
import bcrypt from 'bcryptjs';
import { Console, error } from 'console';
import Logger from '../services/logger_service';
// import { loggers } from "winston";
import dotenv from 'dotenv';
dotenv.config();

 const logger = new Logger('userController');





// Save New Order
const saveOrder = async (req, res) => {
  const orderRefKey = new Date().getUTCMilliseconds();
  const {  orderType ,orderWeight, orderPrice, statusCode  , orderDate, senderDate, deliveryDate} = req.body;
  if ( isEmpty(orderType) || isEmpty(orderWeight) || isEmpty(orderPrice) ||isEmpty(statusCode) ||isEmpty(orderDate) ||isEmpty(senderDate)  ||isEmpty(deliveryDate)    ) {
    errorMessage.error = 'Make sure that you fill out all required fieldsss';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
   const values =  [
    orderRefKey,orderType ,orderWeight, orderPrice, statusCode  , orderDate, senderDate, deliveryDate
   ]

  try {
     const result = await dbQuery.query(queries.createOrderQuery,values);
     const {rows} = await dbQuery.query(queries.orderIdQuery,[orderRefKey])
     const orderId =  rows[0].order_id;
     console.log('order created');
     const {serviceCode , customerId ,senderName, senderMobile, senderLatLng  ,senderCityId, deliverToName,
       deliverToMobile, deliverToLatLng,deliverToCityId ,deliverCountryId,senderCountryId } = req.body;

     if ( isEmpty(serviceCode) || isEmpty(customerId) || isEmpty(senderName) ||isEmpty(senderMobile) ||isEmpty(senderLatLng)
      ||isEmpty(deliverToName) ||isEmpty(deliverToMobile)||isEmpty(deliverToLatLng)||
      isEmpty(senderCityId)||isEmpty(deliverToCityId) || isEmpty(deliverCountryId) || isEmpty(senderCountryId))  {
       errorMessage.error = 'Make sure that you fill out all required fields';
      logger.error(status.error,errorMessage.error);
       return res.status(status.bad).send(errorMessage);
     }
       const customerOrderValues =  [
       orderId,serviceCode , customerId ,senderName, senderMobile, senderLatLng  , senderCityId, deliverToName,
       deliverToMobile,deliverToLatLng, deliverToCityId,deliverCountryId,senderCountryId]

          const customerOrderResult = await dbQuery.query(queries.createCustomerOrderQuery,customerOrderValues);
          successMessage.data = 'New Oreder added successfully';
          logger.info(status.success,successMessage.data);
          return res.status(status.created).send(successMessage);
  } catch (error) {
          console.log(error);
          errorMessage.error = 'Failed to create new order';
          logger.error(status.error,errorMessage.error);
          return res.status(status.bad).send(errorMessage);
  }
};


// Save New Order
const saveSupplierOrder = async (req, res) => {
  const orderRefKey = new Date().getUTCMilliseconds();
  const {  orderType ,orderWeight, orderPrice, statusCode  , orderDate, senderDate, deliveryDate} = req.body;
  if ( isEmpty(orderType) || isEmpty(orderWeight) || isEmpty(orderPrice) ||isEmpty(statusCode) ||isEmpty(orderDate) ||isEmpty(senderDate)  ||isEmpty(deliveryDate)    ) {
    errorMessage.error = 'Make sure that you fill out all required fieldsss';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
   const values =  [
    orderRefKey,orderType ,orderWeight, orderPrice, statusCode  , orderDate, senderDate, deliveryDate
   ]

  try {
     const result = await dbQuery.query(queries.createOrderQuery,values);
     const {rows} = await dbQuery.query(queries.orderIdQuery,[orderRefKey])
     const orderId =  rows[0].order_id;
     console.log('order created');
     const {serviceCode , supplierId ,senderName, senderMobile, senderLatLng  ,senderCityId, deliverToName,
       deliverToMobile, deliverToLatLng,deliverToCityId ,deliverCountryId,senderCountryId } = req.body;
      console.log('data >>>',req.body);
     if ( isEmpty(serviceCode) || isEmpty(supplierId) || isEmpty(senderName) ||isEmpty(senderMobile) ||isEmpty(senderLatLng)
      ||isEmpty(deliverToName) ||isEmpty(deliverToMobile)||isEmpty(deliverToLatLng)||
      isEmpty(senderCityId)||isEmpty(deliverToCityId) || isEmpty(deliverCountryId) || isEmpty(senderCountryId))  {
       errorMessage.error = 'Make sure that you fill out all required fields';
      logger.error(status.error,errorMessage.error);
       return res.status(status.bad).send(errorMessage);

     }
       const supplierOrderValues =  [
       orderId,serviceCode , supplierId ,senderName, senderMobile, senderLatLng  , senderCityId, deliverToName,
       deliverToMobile,deliverToLatLng, deliverToCityId,deliverCountryId,senderCountryId]

          const customerOrderResult = await dbQuery.query(queries.createSupplierOrderQuery,supplierOrderValues);
          successMessage.data = 'New Oreder added successfully';
          logger.info(status.success,successMessage.data);
          return res.status(status.created).send(successMessage);
  } catch (error) {
          console.log(error);
          errorMessage.error = 'Failed to create new order';
          logger.error(status.error,errorMessage.error);
          return res.status(status.bad).send(errorMessage);
  }
};


// Get Customers orders
const getCustomersOrders = async (req, res) => {

  try {
    const { rows } = await dbQuery.query(queries.customersOrdersListQuery);
    successMessage.data = rows;
    logger.info(status.success,successMessage.data)
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // console.log("Error : ", JSON.stringify(error));
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

// Get Suppliers orders
const getSuppliersOrders = async (req, res) => {

  try {
    const { rows } = await dbQuery.query(queries.supliersOrdersListQuery);
    successMessage.data = rows;
    logger.info(status.success,successMessage.data)
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // console.log("Error : ", JSON.stringify(error));
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

const findOrdersByMonth= async (req, res) => {
  const year = req.params.year;
  console.log("Year :",year);
  if (isEmpty(year)) {
    errorMessage.error = 'Year cant be empty';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  try {
  const ordersQuery = queries.findOrdersByMonth;
  const values =  [year];
    const result = await dbQuery.query(ordersQuery,values);
    if(result){
    successMessage.data = result;
    successMessage.data = result.rows;
    logger.info(status.success,successMessage.data);
    return res.status(status.created).send(successMessage);
    }else{
      errorMessage.error = 'Failed to find orders';
      logger.error(status.error,errorMessage.error);
    }
  } catch (error) {
    console.log(error);
    errorMessage.error = 'Failed to find orders';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};



// Update Order
const updateOrder = async (req, res) => {
  const {  statusCode ,orderId} = req.body;
  console.log('sdfsfsf', req.body);
  if ( isEmpty(statusCode) ||isEmpty(orderId) ) {
    errorMessage.error = 'Make sure that you fill out all required fieldsss';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
   const values =  [
  statusCode ,orderId
   ]

  try {
     const result = await dbQuery.query(queries.updatOrderQuery,values);
          successMessage.data = 'Update Order successfully';
          logger.info(status.success,successMessage.data);
          return res.status(status.created).send(successMessage);
  } catch (error) {
          console.log(error);
          errorMessage.error = 'Failed to Update order';
          logger.error(status.error,errorMessage.error);
          return res.status(status.bad).send(errorMessage);
  }
};

export {

  saveOrder,
  getCustomersOrders,
  findOrdersByMonth,
  updateOrder,
  getSuppliersOrders,
  saveSupplierOrder
};
