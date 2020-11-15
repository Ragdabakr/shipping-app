import express from 'express';
import {getUsers,saveUser, enableDisableUser,changePassword ,updateUser,resetPassword ,deleteUser,signIn,findUserById, findUsersByMonth , forgotPassword}  from '../controller/userController';
import { sign } from 'crypto';
import verifyToken from '../middlewares/verifyAuth';



const router = express.Router();


// user routes
router.get('/user/list', getUsers);
// MH add change password route
router.post('/user/password/change', changePassword);

router.post('/user/save', saveUser);
router.post('/user/update', updateUser);
router.post('/user/enableDisableUser', enableDisableUser);
router.post('/user/delete',verifyToken, deleteUser);
router.get('/user/:userId',findUserById);
router.get('/users/findUsersByMonth', findUsersByMonth);
router.post('/login', signIn);
router.post('/user/forgotpassword', forgotPassword);
router.post('/user/resetpassword', resetPassword);

export default router;
