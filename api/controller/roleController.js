
import moment from "moment";
import dbQuery from "../db/dbQuery";
import queries from "../db/queries";
import { dateFormat } from "../helpers/utils";
import { errorMessage, successMessage, status } from "../helpers/status";
import {passwordChecker} from '../helpers/validations';
import { stringify } from "querystring";
import {
  isEmpty,isValidEmail,isValidatePassword,
} from '../helpers/validations';
import bcrypt from 'bcryptjs';
import { Console } from 'console';
import Logger from '../services/logger_service';

const logger = new Logger('roleController')
    
//Create Role

const createRole = async (req, res) => {
  const {roleName ,createdBy} = req.body;
  const createdOn =  moment(new Date());

  if (isEmpty(roleName) || isEmpty(createdBy) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.bad,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const result = await dbQuery.query(queries.roleCheckQuery,[roleName]);
  if(result.rowCount > 0 ){
    errorMessage.error = 'Role already exists';
    logger.error(status.error,errorMessage.error);
    return res.status(status.error).send("Role already exists");
  }

  try {
    const roleCreateResult = await dbQuery.query(queries.roleCreateQuery,[roleName,createdBy,createdOn]);
    if(roleCreateResult['rowCount'] == 1)
    {
        successMessage.data =  'Role Created Successfully';
        logger.info(status.success,successMessage.data)
        return res.status(status.success).send(successMessage);
    }

  } catch (error) {
    // console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};


// Update Role

const updateRole = async (req, res) => {

  const {roleId,roleName,updatedBy} = req.body;
  const updatedOn =  moment(new Date());

  if (isEmpty(roleName) || isEmpty(roleId) || isEmpty(updatedBy) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.bad,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const roleIdCheck = await dbQuery.query(queries.roleIdCheckQuery,[roleId]);
  if(roleIdCheck.rowCount === 0){
    errorMessage.error = "Role id not found in role list"
    logger.error(status.error,errorMessage.error);
    return res.status(status.error).send("Role id not found in role list");
  }

  const updateRoleQuery = queries.updateRoleQuery;
  const values =  [
     roleName,updatedBy,updatedOn,roleId
  ]
  try {
    const result = await dbQuery.query(updateRoleQuery,values);
     if(result.rowCount > 0 )
    {
      errorMessage.error = "Role id not found in role list"
      logger.error(status.error,errorMessage.error);
      return res.status(status.error).send("Role name updated successfully")
    }
  } catch (error) {
    // console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};


//List Roles

const listAllRoles = async (req, res) => {
  try {
     const result = await dbQuery.query(queries.roleListQuery);
     if(result.rowCount > 0 )
    {
      successMessage.data =  result.rows;
      logger.info(status.success,successMessage.data)   
      return res.status(status.success).send(successMessage);
    }
  } catch (error) {
    // console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

//Create addRoleToGroup

const addRoleToGroup = async (req, res) => {
  const {roleId ,createdBy ,groupId} = req.body;
  const createdOn =  moment(new Date());

  if (isEmpty(roleId) || isEmpty(createdBy)|| isEmpty(groupId) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.bad,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const result = await dbQuery.query(queries.roleGroupCheckQuery,[roleId,groupId]);
  if(result.rowCount > 0 ){
    errorMessage.error = 'Role already exists in group';
    logger.error(status.error,errorMessage.error);
    return res.status(status.error).send("Role already exists in group");
  }

  try {
    const roleGroupResult = await dbQuery.query(queries.roleGroupCreateQuery,[roleId,groupId,createdBy,createdOn]);
    if(roleGroupResult['rowCount'] == 1)
    {
        successMessage.data =  'Role added to group Successfully';
        logger.info(status.success,successMessage.data)
        return res.status(status.success).send(successMessage);
    }

  } catch (error) {
    // console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};


//List groups with roles

const listGroupWithRoles= async (req, res) => {
  try {
     const result = await dbQuery.query(queries.listGroupWithRolesQuery);
     if(result.rowCount > 0 )
    {
      successMessage.data =  result.rows;
      logger.info(status.success,successMessage.data)
      return res.status(status.success).send(successMessage);
    }
  } catch (error) {
    // console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

// Enable Disable Role

const enableDisableRole= async (req, res) => {
  const {roleId, active ,updatedBy } = req.body;

  const updatedOn =  moment(new Date());

  if (isEmpty(roleId) || isEmpty(active) || isEmpty(updatedBy) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.bad,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const roleIdCheck = await dbQuery.query(queries.roleIdCheckQuery,[roleId]);
  if(roleIdCheck.rowCount === 0){
    errorMessage.error = 'Role id not found in role list';
    logger.error(status.error,errorMessage.error);
    return res.status(status.error).send("Role id not found in role list");
  }

  const enableDisableRoleQuery = queries.enableDisableRoleQuery;
  const values =  [
    active,updatedOn,updatedBy,roleId
  ]
  try {
    const result = await dbQuery.query(enableDisableRoleQuery,values);
    successMessage.data = 'Role updated successfully';
    logger.info(status.created,successMessage.data)
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log('error/',error);
    errorMessage.error = 'Failed to enable disable role';
    logger.error(status.bad,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};

export {
  createRole,
  updateRole,
  listAllRoles,
  addRoleToGroup,
  listGroupWithRoles,
  enableDisableRole
};
