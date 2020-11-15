import express from 'express';
import {createGroup,updateGroup,listAllGroups ,listGroupWithRoles}  from '../controller/groupController';

const groupRouter = express.Router();

// MH add Create Group route
groupRouter.post('/group/create', createGroup);
// MH add Update Group route
groupRouter.post('/group/update', updateGroup);
// MH add Update Group route
groupRouter.post('/group/list', listAllGroups);
groupRouter.get('/group/listGroupWithRoles', listGroupWithRoles);
export default groupRouter;
