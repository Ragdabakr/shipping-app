
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

const logger = new Logger('groupController')

/**
 * MH
 * Desc   : Create Group Method
 *
 */
const createGroup = async (req, res) => {
  try {
    const {groupName} = req.body;
    //Print out Parameters Value
    console.log('\n groupName : ',groupName)

    //add validation for group name - no spaces - trim
    // check if group name already exist in database
     const result = await dbQuery.query(queries.groupSearchQuery,[groupName]);
    if(result.rowCount > 0 ){
      errorMessage.error = "group already exists ... "
      logger.error(status.error,errorMessage.error);
      return res.status(status.error).send("group already exists ... ");
    }
     

    // If Passed All Conditions Then Update Database
    const groupCreateResult = await dbQuery.query(queries.groupCreateQuery,[groupName]);
    console.log('Group Create Result : ',groupCreateResult['rowCount']);
    if(groupCreateResult['rowCount'] == 1)
    {
        //successfully update database
        successMessage.data =  'Group Created Successfully';
        logger.info(status.success,successMessage.data)
        return res.status(status.success).send(successMessage);
    }
    else{
        // no update
        failMessage.data =  'Failed To Create Group';
        logger.error(status.error,failMessage.data);
        return res.status(status.error).send(failMessage);
    }
  } catch (error) {
    console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};
// End Create Group

/**
 * MH
 * Desc   : Update Group Method
 *
 */
const updateGroup = async (req, res) => {
  try {
    const {groupId,groupName} = req.body;
    //Print out Parameters Value
    console.log('\n groupId : ',groupId,'\n groupName',groupName)

    //add validation for group name - no spaces - trim
    // check if group name already exist in database
     const result = await dbQuery.query(queries.groupUpdateQuery,[groupName,groupId]);
    console.log('rows.rowCount : ',result)
     if(result.rowCount > 0 )
    {
      successMessage.data =  'group name updated successfully ... ';
      logger.info(status.success,successMessage.data)
      return res.status(status.success).send("group name updated successfully ... ")
    }
    else{
        // no update
        errorMessage.error = "Failed To Update Group Name ... "
        logger.error(status.error,errorMessage.error);
        return res.status(status.error).send('Failed To Update Group Name');
    }
  } catch (error) {
    // console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};
// End Update Group

/**
 * MH
 * Desc   : List Groups Method
 *
 */
const listAllGroups = async (req, res) => {
  try {
     const result = await dbQuery.query(queries.groupListQuery);
    console.log('rows.rowCount : ',result.rowCount)
     if(result.rowCount > 0 )
    {
      successMessage.data =  result.rows;
      logger.info(status.success,successMessage.data)
      return res.status(status.success).send(result.rows)
    }
    else{
        // no update
        errorMessage.error = "no groups found ... "
        logger.error(status.error,errorMessage.error);
        return res.status(status.error).send('no groups found');
    }
  } catch (error) {
    // console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};
// End List Group

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

export {
  createGroup,
  updateGroup,
  listAllGroups,
  listGroupWithRoles
};
