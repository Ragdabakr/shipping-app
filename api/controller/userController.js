import moment from "moment";
import dbQuery from "../db/dbQuery";
import queries from "../db/queries";
import { dateFormat } from "../helpers/utils";
import { errorMessage, successMessage, status } from "../helpers/status";
import {passwordChecker, generateToken} from '../helpers/validations';
import { stringify } from "querystring";
import * as nodemailer from 'nodemailer';
import {
  isEmpty,isValidEmail,isValidatePassword,
} from '../helpers/validations';
import bcrypt from 'bcryptjs';
import { Console, error } from 'console';
import Logger from '../services/logger_service';
import {sendEmail} from '../helpers/email';
import {saveCustomer} from './customerController';
// import { loggers } from "winston";
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const logger = new Logger('userController');

// Get Users
const getUsers = async (req, res) => {
  const created_on = dateFormat();

  try {
    const { rows } = await dbQuery.query(queries.userListQuery);
    successMessage.data = rows;
    console.log(rows);
    logger.info(status.success,successMessage.data)
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // console.log("Error : ", JSON.stringify(error));
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};


// Desc   : Change Password Method
const changePassword = async (req, res) => {
  try {
    const {userId,oldPassword, confirmNewPassword,newPassword} = req.body;
    //Print out Parameters Value
    console.log('\n UserId : ',userId,
    '\n oldPassword : ',oldPassword ,
    '\n confirmNewPassword:',confirmNewPassword,
    '\n newPassword : ',newPassword)

    var bcrypt = require('bcryptjs');

    // Retrieve Current Password From DB
     const { rows } = await dbQuery.query(queries.userPasswordQuery,[userId]);

    // check if the query returned value
    var storedDBPassword = rows[0]['password'];
    if(storedDBPassword != null && storedDBPassword.length > 0)
    {
      if(bcrypt.compareSync(oldPassword,storedDBPassword))
      {
        console.log('Old Password Match Database...')
        if( newPassword.toString() != confirmNewPassword.toString()){
          // console.log('entered passwords not match...')
          errorMessage.error = 'entered passwords not match...'
          logger.error(status.error,error);
          return res.status(status.error).send("entered passwords not match...");
        }
        if(!passwordChecker.validate(newPassword) || !passwordChecker.validate(confirmNewPassword)){
          console.log('New Password Doesn\'t Meet Complexty');
          errorMessage.error = 'New Password Doesn\'t Meet Complexty'
          logger.error(status.error,errorMessage.error);
          return res.status(status.error).send("New Password Doesn\'t Meet Complexty");
        }
      }else{
        // console.log('Password Not Match ...')
        errorMessage.error = 'OLD Password Not Match...'
        logger.error(status.error,errorMessage.error);
        return res.status(status.error).send("OLD Password Not Match...");
      }
    }

    // If Passed All Conditions Then Update Database
    var newPasswordHash = bcrypt.hashSync(newPassword);
    const passwordUpdateResult = await dbQuery.query(queries.userPasswordUpdateQuery,[newPasswordHash ,userId]);
    console.log('Password Update Result : ',passwordUpdateResult['rowCount']);
    if(passwordUpdateResult['rowCount'] == 1)
    {
        //successfully update database
        successMessage.data =  'Password Updated Successfully';
        logger.info(status.success,successMessage.data)
        return res.status(status.success).send(successMessage);
    }
    else{
        // no update
        failMessage.data =  'Failed To Update Password';
        logger.error(status.error,failMessage);
        return res.status(status.error).send(failMessage);
    }

  } catch (error) {
    // console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};
// End Change Password

// Save New User
const saveUser = async (req, res) => {

    // logger.info('save user - request params : ', JSON.stringify(req.body))
  const {username, fullName,email ,userTypeCode,createdBy,password} = req.body;
  const createdOn =moment(new Date());
  if (isEmpty(username) || isEmpty(fullName) || isEmpty(email) || isEmpty(password) ||isEmpty(userTypeCode) || isEmpty(createdBy)){
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const checkEmail =  await dbQuery.query(queries.checkEmailQuery,[email]);
   if (checkEmail.rowCount > 0) {
     errorMessage.error = 'Email already exist';
     logger.error(status.error,errorMessage.error);
     return res.status(status.bad).send(errorMessage);
   }

  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidatePassword(password)) {
    errorMessage.error = 'Password must be more than 8 characters';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = await bcrypt.hash(password,10);
  const saveUserQuery = queries.createUserQuery;

  const values =  [
    username, fullName,email, hashedPassword ,userTypeCode,createdOn,createdBy
   ]

  try {
    const result = await dbQuery.query(saveUserQuery,values);

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.Email,
    //     pass: process.env.pass
    //   }
    // });
    // var mailOptions = {
    //   from: process.env.Email,
    //   to: email,
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });

    successMessage.data = 'New user added successfully';
    sendEmail(email,'Sending Email using Node.js[nodemailer]',successMessage.data)
    logger.info(status.success,successMessage.data)
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log("eror",error);
    errorMessage.error = error;
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};

// Update User
const updateUser = async (req, res) => {
  const {username, fullName,email, userTypeCode ,userId,updatedBy} = req.body;
  const updatedOn =  moment(new Date());
  if (isEmpty(username) || isEmpty(fullName) || isEmpty(email) ||isEmpty(userTypeCode) ||isEmpty(userId) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }


  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  const userQuery = queries.updateUserQuery;
  const values =  [
    username, fullName,email, userTypeCode,updatedOn,updatedBy,userId
  ]
  try {
    const result = await dbQuery.query(userQuery,values);
    successMessage.data = 'User updated successfully';
    logger.info(status.success,successMessage.data)
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log('error:',error);
    errorMessage.error = 'Failed to update user';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};

// Enable Disable User
  const enableDisableUser= async (req, res) => {
  const {userId, active ,updatedBy } = req.body;
  console.log('userId>>' ,userId);

  const updatedOn =  moment(new Date());

  if (isEmpty(userId) || isEmpty(active) || isEmpty(updatedBy) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    return res.json(errorMessage,error);
  }

  const enableDisableUserQuery = queries.enableDisableUserQuery;
  const values =  [
    active,updatedOn,updatedBy,userId]
  try {
    const result = await dbQuery.query(enableDisableUserQuery,values);
    successMessage.data = 'User updated successfully';
    logger.info(status.success,successMessage.data)
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Failed to enable disable user';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};
//Delete User With Id
const deleteUser = async (req, res) => {
  const userId = [req.body.user_id];

  if(isEmpty(userId)){
    errorMessage.error = 'Please enter a valid userId';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const result = await dbQuery.query(queries.deleteUser,userId);
    successMessage.data = 'User deleted successfully';
    logger.info(status.success,successMessage.data)
    return res.status(status.created).send(successMessage);
  } catch (error) {
    // console.log('error/',error);
    errorMessage.error = 'Some thing went wrong';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};

//login with email and password
const signIn = async (req,res)=>{

  const {email, password} = req.body;

  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidatePassword(password)) {
    errorMessage.error = 'Password must be more than 8 characters';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const value = [email];

  try {
    const {rows} =  await dbQuery.query(queries.loginQuery,value);
    const DBResponse = rows[0];
    // console.log("database: ")
    // console.log(DBResponse)


    console.log("database: ");
    console.log('DBResponse',DBResponse);

  if (DBResponse == null || isEmpty(DBResponse)){
    errorMessage.error = 'invalid email or password';
    logger.error(status.error,errorMessage.error);
    return res.status(status.unauthorized).send(errorMessage);
  }
  console.log("SignIn - Hash Password: >>>>> " + bcrypt.hashSync(password));

  const ValidePassword = await bcrypt.compare(password, DBResponse.password);
  if(!ValidePassword){
    errorMessage.error = 'invalid email or password';
    // console.log("pass not valide")
    logger.error(status.error,errorMessage.error);
  }
  console.log('ValidePassword',ValidePassword);
  if(!ValidePassword){
    errorMessage.error = 'invalid email or password';
    console.log("pass not valide");

    return res.status(status.unauthorized).send(errorMessage);
  }
  const token = generateToken(DBResponse.email,DBResponse.user_id,DBResponse.username,DBResponse.user_type_code,DBResponse.full_Name)
  console.log('token',token);
  successMessage.data = DBResponse;
  successMessage.data.token = token;
  console.log("token created");

  logger.info(status.success,successMessage.data)
  return res.stats(status.success).send(successMessage);
}catch (error){
  // console.log("token not created")
  errorMessage.error = 'token not created';
  logger.error(status.error,errorMessage.error);

  return res.status(status.success).send(successMessage);
}

};

// Find User By Id
const findUserById = async (req, res) => {
  const userId = req.params.userId;
  if (isEmpty(userId)) {
    errorMessage.error = 'UserId cant be empty';
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
  try {
  const userQuery = queries.findUserByIdQuery;
  const values =  [userId];
    const result = await dbQuery.query(userQuery,values);
    successMessage.data = result.rows[0];
    logger.info(status.success,successMessage.data);
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = error;
    logger.error(status.error,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }
};

const findUsersByMonth = async (req, res) => {
 const created_on = dateFormat();

  try {
    const { rows } = await dbQuery.query(queries.findUsersByMonth);
    successMessage.data = rows;
    console.log(rows);
    logger.info(status.success,successMessage.data)
    return res.status(status.success).send(successMessage);
  } catch (error) {
   console.log("Error : ",error);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};


const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;
    //Print out Parameters Value
    console.log('email : ',email);

    const checkEmail =  await dbQuery.query(queries.checkEmailQuery,[email]);
   if (checkEmail.rowCount === 1) {

  var bcrypt = require('bcryptjs');
  const token = crypto.randomBytes(16).toString('hex');
  const link = "http://localhost:4200/#/resetpassword?token=" + token + "&email="+ email ;

    const {rows} =  await dbQuery.query(queries.verification,[token,email]);
    const transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com', // Gmail Host
      port: 465, // Port
      secure: true,
      auth: {
          user: 'ragdabakr5@gmail.com',
          pass: 'regorego1'
      },
      tls:{
        rejectUnauthorized:false
      }
    });
    let mailOptions = {
        from: '"لنك استعادة كلمة المرور نامج اشحنلي" <ragdabakr5@gmail.com>', // sender address
        to:email,
        subject: 'استعادة كلمة المرور من اشحنلي',
        html : "مرحبا,<br>  لأستعادة كلمة المرور<br><a href="+link+">اضغط هنا </a>"
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
   }

  } catch (error) {
     console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const {password,token} = req.body;
    console.log('password : ',password);
    const hashedPassword = await bcrypt.hash(password,10);
    console.log('token : ',token);
    const findUserByTokenQuery = queries.findUserByTokenQuery;
    const result = await dbQuery.query(findUserByTokenQuery,[token]);
    successMessage.data = result.rows[0];
    const userEmail =  result.rows[0].email;
    console.log("userEmail" , userEmail);
    logger.info(status.success,successMessage.data);

      const userPasswordQuery = queries.updateUserPasswordQuery;
      const res = await dbQuery.query(userPasswordQuery,[hashedPassword,userEmail]);
      successMessage.data = res.rows[0];
      logger.info(status.success,successMessage.data);
      // return res.status(status.created).send(successMessage);
  } catch (error) {
     console.log(error.stack);
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

export {
  getUsers,
  changePassword,
  saveUser,
  updateUser,
  enableDisableUser,
  deleteUser,
  signIn,
  findUserById,
  findUsersByMonth,
  forgotPassword,
  resetPassword
};
