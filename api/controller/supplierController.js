import {generateApi,isAPIKeyValid}  from '../helpers/apiGenerationUtils';
import Logger from '../services/logger_service';
import { errorMessage, successMessage, status } from "../helpers/status";
import {
  isEmpty,isValidEmail
} from '../helpers/validations';
import moment from "moment";
import dbQuery from "../db/dbQuery";
import queries from "../db/queries";

const logger = new Logger('supplierController');

const generateAPIKey = async (req,res)=>{
//    logger.info('genereateAPIKey');
console.log("supp :",req.body)
const {supplierId} = req.body;
if(isEmpty(supplierId)){
    errorMessage.error = 'Make sure that you fill out all required fields';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
}
const generateApiKeySupplierQuery = queries.generateApiKeySupplierQuery;
console.log(generateApi())
   try {
      const {uuid,apiKey} = generateApi();
      const values =  [supplierId,uuid,apiKey];
      const result = await dbQuery.query(generateApiKeySupplierQuery,values);
      successMessage.data = apiKey;
      return res.status(status.created).send(successMessage)
   } catch (error) {
       logger.error(error);
       errorMessage.error = error;
       return res.status(status.error).send(errorMessage)
   }
}
const isKeyValid = (req,res)=>{
    logger.info('isAPIKeyValid');
    const {
        apiKey,uuId
    } = req.body;
    try {
        let valid = isAPIKeyValid(apiKey,uuId);
        successMessage.data = valid;
        logger.info(successMessage.status,successMessage.data);
        return res.status(status.created).send(successMessage);
    } catch (error) {
        logger.error(error);
        errorMessage.error = error;
        return res.status(status.error).send(errorMessage)
    }
};
const  getSuppliers = async (req, res) => {

    try {
      const { rows } = await dbQuery.query(queries.SupplierListQuery);
      successMessage.data = rows;
      logger.info(status.success,successMessage.data);
      return res.status(status.success).send(successMessage);
    } catch (error) {
      logger.error(status.error,error);
      return res.status(status.error).send(error);
    }
};

  //Get Supplier by name
  const  getSupplierByName = async (req, res) => {
    const {supplierName} = req.params;
    console.log("supplierName", supplierName);
     try {
       const { rows } = await dbQuery.query(queries.getSupplierIdByNameQuery,[supplierName]);
       successMessage.data = rows;
       logger.info(status.success,successMessage.data);
       return res.status(status.success).send(successMessage);
     } catch (error) {
       console.log('error', error)
       logger.error(status.error,error);
       return res.status(status.error).send(error);
     }
   };


const saveSupplier = async (req,res) => {
    const {supplier_fullname,supplier_email,supplier_phone,created_by,city_id ,country_id} = req.body;
     console.log(req.body)
    if ( isEmpty(supplier_fullname) || isEmpty(supplier_email) || isEmpty(created_by) || isEmpty(supplier_phone) || isEmpty(country_id) || isEmpty(city_id) ) {
      errorMessage.error = 'Make sure that you fill out all required fields';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }
    const checkEmail =  await dbQuery.query(queries.checkSupplierEmailQuery,[supplier_email]);
    if (checkEmail.rowCount > 0) {
      errorMessage.error = 'Email already exist';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }
    const checkSupplierFullname =  await dbQuery.query(queries.checkSupplierFullnameQuery,[supplier_fullname]);
    if (checkSupplierFullname.rowCount > 0) {
      errorMessage.error = 'Supplier fullname already exist';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }
    const saveSupplierQuery = queries.createSupplierQuery;
    const createdOn =  moment(new Date());

    const Supplier =  [
       supplier_fullname,supplier_email,supplier_phone,createdOn,created_by,city_id,country_id
     ]

    try {
      const resultSupplier = await dbQuery.query(saveSupplierQuery,Supplier);
      successMessage.data = 'New supplier added successfully';
      logger.info(status.success,successMessage.data)
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Failed to create new supplier';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }
  };
  const updateSupplier = async (req, res) => {
    const {supplier_id,supplier_fullname, supplier_email,supplier_phone,city_id,country_id,update_by} = req.body;
    console.log(req.body)
    const updatedOn =  moment(new Date());
    if (isEmpty(supplier_id)  ||isEmpty(supplier_fullname)  || isEmpty(supplier_email)  || isEmpty(country_id) || isEmpty(supplier_phone) || isEmpty(city_id)|| isEmpty(update_by)) {
      errorMessage.error = 'Make sure that you fill out all required fields';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }

    const supplierIdCheck = await dbQuery.query(queries.checkSupplierIdQuery,[supplier_id]);
    if(supplierIdCheck.rowCount === 0){
      errorMessage.error = 'Suppplier id not found in supplier list'
      logger.error(status.error,errorMessage.error);
      return res.status(status.error).send("Supplier id not found in supplier list");
    }

    if (!isValidEmail(supplier_email)) {
      errorMessage.error = 'Please enter a valid Email';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }

    const supplierQuery = queries.updateSupplierQuery;
    const values =  [
      supplier_id,supplier_fullname, supplier_email,supplier_phone,updatedOn ,update_by,city_id,country_id
    ]
    try {
      const result = await dbQuery.query(supplierQuery,values);
      successMessage.data = 'supplier updated successfully';
      logger.info(status.success,successMessage.data)
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Failed to update supplier';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }
  };
  const enableDisableSupplier= async (req, res) => {
    const {supplierId, active ,updatedBy } = req.body;
    const updatedOn =  moment(new Date());

    if (isEmpty(supplierId) || isEmpty(active) || isEmpty(updatedBy) ) {
      errorMessage.error = 'Make sure that you fill out all required fields';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }

    const supplierIdCheck = await dbQuery.query(queries.checkSupplierIdQuery,[supplierId]);
    if(supplierIdCheck.rowCount === 0){
      errorMessage.error = 'supplier id not found in supplier list';
      logger.error(status.error,errorMessage.error);
      return res.status(status.error).send("supplier id not found in supplier list");
    }

    const enableDisableSupplierQuery = queries.enableDisableSupplierQuery;
    const values =  [
      active,updatedOn,updatedBy,supplierId]
    try {
      const result = await dbQuery.query(enableDisableSupplierQuery,values);
      successMessage.data = 'Supplier updated successfully';
      logger.info(status.success,successMessage.data)
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Failed to enable disable supplier';
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage);
    }
  };
  //Get Supplier order details
const  supplierOrderDetails = async (req, res) => {
  const supplierId = req.params.supplierId;
  console.log("supplierId>>>" ,supplierId);
   try {
     const { rows } = await dbQuery.query(queries.supplierOrdersListQuery,[supplierId]);
     successMessage.data = rows;
     logger.info(status.success,successMessage.data);
     return res.status(status.success).send(successMessage);
   } catch (error) {
     console.log('error', error);
     logger.error(status.error,error);
     return res.status(status.error).send(error);
   }
 };
  export {
      generateAPIKey,
      getSuppliers,
      isAPIKeyValid,
      saveSupplier,
      updateSupplier,
      enableDisableSupplier,
      getSupplierByName,
      supplierOrderDetails
  }
