import express from 'express';
import {getCities ,   getOrderTypes, getOrderStatus , getCountries , getCitiesByCountryId , countriesCode}  from '../controller/lookupController';
const router = express.Router();
router.get('/lookup/cities', getCities);
router.get('/lookup/orderTypes', getOrderTypes);
router.get('/lookup/getOrderStatus', getOrderStatus);
router.get('/lookup/countries', getCountries);
router.get('/cities/list', getCities);
router.get('/lookup/citiesByCountryId/:countryId', getCitiesByCountryId);
router.get('/countriesCode', countriesCode);


export default router;

