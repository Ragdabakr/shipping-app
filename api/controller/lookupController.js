
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
const data = require("../helpers/countries");

 const logger = new Logger('userController');

// Get cities
const getCities= async (req, res) => {

  try {
    const { rows } = await dbQuery.query(queries.cityQuery);
    successMessage.data = rows;
    logger.info(status.success,successMessage.data)
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // console.log("Error : ", JSON.stringify(error));
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

// Get countries
const getCountries= async (req, res) => {

  try {
    const { rows } = await dbQuery.query(queries.countryQuery);
    successMessage.data = rows;
    logger.info(status.success,successMessage.data)
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // console.log("Error : ", JSON.stringify(error));
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};
// Get Order status
const getOrderStatus = async (req, res) => {

  try {
    const { rows } = await dbQuery.query(queries.orderStatusQuery);
    successMessage.data = rows;
    logger.info(status.success,successMessage.data)
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // console.log("Error : ", JSON.stringify(error));
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

// Get Order services
const getOrderTypes = async (req, res) => {

  try {
    const { rows } = await dbQuery.query(queries.orderTypeQuery);
    successMessage.data = rows;
    logger.info(status.success,successMessage.data)
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // console.log("Error : ", JSON.stringify(error));
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

// Get city by country id
const getCitiesByCountryId = async (req, res) => {
  const countryId = req.params.countryId;
  console.log("countryIdjj" , countryId);
  if (isEmpty(countryId)) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    logger.error(status.bad,errorMessage.error);
    return res.status(status.bad).send(errorMessage);
  }

  const getCitiesByCountryQuery = queries.getCitiesByCountry;
  try {
    const {rows} = await dbQuery.query(getCitiesByCountryQuery,[countryId]);
    successMessage.data = rows;
    logger.info(status.success,successMessage.data);
    return res.status(status.success).send(successMessage);
  } catch (error) {
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

// Get Order services
const countriesCode = async (req, res) => {
  try {
    const {rows} = await dbQuery.query(queries.getCountriesCodeQuery);
    successMessage.data = rows;
    logger.info(status.success,successMessage.data);
    return res.status(status.success).send(successMessage);
  } catch (error) {
    // console.log("Error : ", JSON.stringify(error));
    logger.error(status.error,error);
    return res.status(status.error).send(error);
  }
};

export {

  getCities,
  getOrderTypes,
  getOrderStatus,
  getCountries,
  getCitiesByCountryId,
  countriesCode
};
