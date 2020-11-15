import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorMessage, successMessage, status } from "../helpers/status";
import env from '../env';
import {getUserIp} from '../helpers/utils';
import { deleteUser } from '../controller/userController';
import { loggers } from 'winston';
import Logger from '../services/logger_service';

const logger = new Logger('userController')

dotenv.config();

const verifyToken = async (req,res,next)=>{
    
 let {token} = req.headers
  const clientIP = getUserIp(req);
 if(!token){
      errorMessage.error = "Token not provided for clientIP ["+clientIP+"]";
      logger.error(status.error,errorMessage.error);
      return res.status(status.bad).send(errorMessage); 
}
// res.json({namee: "anass"})
// console.log(token)
     
     try {
      
      let decoded = jwt.verify(token,process.env.JWT_SECRET)
      console.log(decoded)
      req.user = {
         email: decoded.email,
         user_id: decoded.user_id,
         firstName: decoded.firstName,
         lastName: decoded.lastName
      };
      successMessage.message = "Token verified for user ["+decoded.email+"] and clientIP ["+clientIP+"]";
      logger.info(status.success,successMessage.message)
      next();
     } catch (error) {
      errorMessage.error = "Authentication Field for clientIP ["+clientIP+"]";
      logger.error(status.unauthorized,errorMessage.error);
      return res.status(status.unauthorized).send(errorMessage.error);
     }

   
 }

export default verifyToken;
