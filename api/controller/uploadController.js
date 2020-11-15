import multer from 'multer';
import { errorMessage, successMessage, status } from "../helpers/status";
import Logger from '../services/logger_service';
import dotenv from 'dotenv';
var path = require('path');
dotenv.config();
const logger = new Logger('uploadController')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_PATH);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage }).single('image');

// var upload = multer({ dest : process.env.UPLOAD_PATH}).single("photo");

const uploadFile = function(req,res){

  upload(req,res,function(err) {

    if(err) {
      console.log('err' + err);
        errorMessage.error = "Error uploading file.";
        return res.status(status.error).send(errorMessage);
    }
    console.log('file details is  ' + JSON.stringify(res.req.file));
    console.log('The filename is ' + res.req.file.filename);
    successMessage.data =  "File is uploaded";
    return res.status(status.success).send(successMessage);
  });
}

export {
  uploadFile
};
