import moment from "moment";
import dbQuery from "../db/dbQuery";
import queries from "../db/queries";
import { dateFormat } from "../helpers/utils";
import { errorMessage, successMessage, status } from "../helpers/status";
import {
  isEmpty,isValidEmail
} from '../helpers/validations';
import Logger from '../services/logger_service';
const logger = new Logger('customerController')
import bcrypt from 'bcryptjs';


//Get Customer
const  getCustomers = async (req, res) => {
    try {
      const { rows } = await dbQuery.query(queries.customerListQuery);
      successMessage.data = rows;
      logger.info(status.success,successMessage.data)
      return res.status(status.success).send(successMessage);
    } catch (error) {
      console.log('error', error)
      logger.error(status.error,error);
      return res.status(status.error).send(error);
    }
  };

  const saveCustomer = async (req,res) => {
  const {username,customer_fullname,customer_email,customer_phone_1,customer_phone_2  ,created_by,city_id, country_id,password} = req.body;
   const createdOn =  moment(new Date());
  if (isEmpty(username) || isEmpty(customer_fullname) || isEmpty(customer_email) || isEmpty(password)  || isEmpty(customer_phone_1) || isEmpty(customer_phone_2) || isEmpty(city_id) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const checkfullname =  await dbQuery.query(queries.checkCustomerFullnameQuery,[customer_fullname]);
  if (checkfullname.rowCount > 0) {
    errorMessage.error = 'Customer full name already exist';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const checkEmail =  await dbQuery.query(queries.checkEmailQuery,[customer_email]);
  if (checkEmail.rowCount > 0) {
    errorMessage.error = 'Email already exist';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = await bcrypt.hash(password,10);
  const saveUserQuery = queries.createUserQuery;
  const UserIdQuery = queries.UserIdQuery;
  const userTypeCode = 'customer';
  const saveCustomerQuery = queries.createCustomerQuery;
  const User =  [
    username, customer_fullname,customer_email, hashedPassword ,userTypeCode,createdOn,created_by
   ]
  try {
    const resultUser = await dbQuery.query(saveUserQuery,User);
    successMessage.data = 'New user added successfully';
    const {rows} = await dbQuery.query(UserIdQuery,[customer_email])
       console.log("rows" , rows[0]);
    const userId =  rows[0].user_id;
    console.log("userid" , userId);
    const Customer =  [
      customer_fullname,customer_email,customer_phone_1,customer_phone_2 ,createdOn,created_by,city_id,country_id,userId
     ]
    const resultCustomer = await dbQuery.query(saveCustomerQuery,Customer);
    successMessage.data = 'New customer added successfully';
    logger.info(status.success,successMessage.data)
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log("error",error);
    errorMessage.error = 'Failed to create new customer';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};


const updateCustomer = async (req, res) => {
  const {customer_id,customer_fullname, customer_email,customer_phone_1,customer_phone_2,city_id,update_by} = req.body;
  const updatedOn =  moment(new Date());
  if (isEmpty(customer_id)  ||isEmpty(customer_fullname)  || isEmpty(customer_email)  || isEmpty(customer_phone_1) || isEmpty(customer_phone_2) || isEmpty(city_id)|| isEmpty(update_by)) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  const customerIdCheck = await dbQuery.query(queries.checkCustomerIdQuery,[customer_id]);
  if(customerIdCheck.rowCount === 0){
    errorMessage.error = 'Customer id not found in customer list'
    logger.error(status.error,errorMessage.error);
    return res.status(status.error).send("Customer id not found in customer list");
  }
  if (!isValidEmail(customer_email)) {
    errorMessage.error = 'Please enter a valid Email';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  const customerQuery = queries.updateCustomerQuery;
  const values =  [
    customer_id,customer_fullname, customer_email,customer_phone_1,customer_phone_2 ,updatedOn ,update_by,city_id
  ]
  try {
    const result = await dbQuery.query(customerQuery,values);
    successMessage.data = 'customer updated successfully';
    logger.info(status.success,successMessage.data)
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Failed to update customer';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};


const enableDisableCustomer= async (req, res) => {
  const {customerId, active ,updatedBy } = req.body;
  const updatedOn =  moment(new Date());
  if (isEmpty(customerId) || isEmpty(active) || isEmpty(updatedBy) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  const customerIdCheck = await dbQuery.query(queries.checkUserIdQuery,[customerId]);
  if(customerIdCheck.rowCount === 0){
    errorMessage.error = 'Customer id not found in user list';
    logger.error(status.error,errorMessage.error);
    return res.status(status.error).send("Customer id not found in user list");
  }
  const enableDisableCustomerQuery = queries.enableDisableCustomerQuery;
  const values =  [
    active,updatedOn,updatedBy,customerId]
  try {
    const result = await dbQuery.query(enableDisableCustomerQuery,values);
    successMessage.data = 'Customer updated successfully';
    logger.info(status.success,successMessage.data)
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Failed to enable disable customer';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};


//Get Customer order details
const  customerOrderDetails = async (req, res) => {
   const customerId = req.params.customerId;
   console.log("customerId>>>" ,customerId);
    try {
      const { rows } = await dbQuery.query(queries.customerOrdersListQuery,[customerId]);
      successMessage.data = rows;
      logger.info(status.success,successMessage.data)
      return res.status(status.success).send(successMessage);
    } catch (error) {
      console.log('error', error)
      logger.error(status.error,error);
      return res.status(status.error).send(error);
    }
  };

  //Get Customer by name
const  getCustomerByName = async (req, res) => {
  const {customerName} = req.params;
  console.log("customerName", customerName);
   try {
     const { rows } = await dbQuery.query(queries.getCustomerIdByNameQuery,[customerName]);
     successMessage.data = rows;
     logger.info(status.success,successMessage.data);
     return res.status(status.success).send(successMessage);
   } catch (error) {
     console.log('error', error)
     logger.error(status.error,error);
     return res.status(status.error).send(error);
   }
 };


const findCustomersByMonth = async (req, res) => {
   try {
     const { rows } = await dbQuery.query(queries.findCustomersByMonth);
     successMessage.data = rows;
     console.log(rows);
     logger.info(status.success,successMessage.data);
     return res.status(status.success).send(successMessage);
   } catch (error) {
    console.log("Error : ",error);
     logger.error(status.error,error);
     return res.status(status.error).send(error);
   }
 };


export{
    getCustomers,
    saveCustomer,
    updateCustomer,
    enableDisableCustomer,
    customerOrderDetails,
    getCustomerByName,
    findCustomersByMonth
}

