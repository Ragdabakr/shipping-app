import express from 'express';
import { saveSupplier,generateAPIKey,getSuppliers ,updateSupplier,getSupplierByName, enableDisableSupplier , supplierOrderDetails} from '../controller/supplierController';

const router = express.Router();

router.get('/supplier/list',getSuppliers)
router.post('/supplier/save',saveSupplier);
router.post('/supplier/update',updateSupplier);
router.post('/supplier/enableDisableSupplier', enableDisableSupplier);
router.post('/supplier/generateApiKey',generateAPIKey);
router.get('/supplier/getSupplierIdByName/:supplierName',getSupplierByName );
router.get('/supplier/supplierOrderDetails/:supplierId', supplierOrderDetails);


export default router;
