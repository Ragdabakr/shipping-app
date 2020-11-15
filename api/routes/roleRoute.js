import express from 'express';
import {createRole,updateRole,listAllRoles,addRoleToGroup,listGroupWithRoles , enableDisableRole}  from '../controller/roleController';

const router = express.Router();


router.post('/role/create', createRole);
router.post('/role/update', updateRole);
router.get('/role/list', listAllRoles);
router.post('/role/addRoleToGroup', addRoleToGroup);
router.get('/role/listGroupWithRoles', listGroupWithRoles);
router.post('/role/enableDisableRole', enableDisableRole);


export default router;
