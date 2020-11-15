import winston from 'winston';
import dotenv from 'dotenv';
import env from '../env';

dotenv.config();

const dateFormat = ()=>{
    return new Date(Date.now()).toLocaleString();
}

class LoggerService{

constructor(route){
 this.log_data = null ;
 this.route = route;
 const logger = winston.createLogger({
    format: winston.format.printf(info =>{
    // console.log(info)
      let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} |`;
      message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message;
      message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message;
      return message;
    }),
    transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH}/${route}.log`}),
    ],
    });
    this.logger = logger ;
}

setLogData(log_data){
    this.log_data = log_data
}

async info(message){
    this.logger.log('info',message)
}

async info(message, obj){
    this.logger.log('info',message,{
        obj
    })
}

async debug(message){
    this.logger.log('debug',message)
}

async debug(message, obj){
    this.logger.log('debug',message,{
        obj
    })
}

async error(message,obj){
    this.logger.log('error',message,{
        obj
    })
}


}

//module.exports = LoggerService ;

export default LoggerService;
