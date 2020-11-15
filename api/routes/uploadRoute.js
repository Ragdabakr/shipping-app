import express from 'express';
import {uploadFile}  from '../controller/uploadController';

const router = express.Router();


router.post('/upload/file', uploadFile);

export default router;
