import { Router } from 'express';
import controller from '../controllers/samples';
import filesParser from '../lib/handlers/files_parser';

const router: Router = Router();

router.get('/asset/:id', controller.getAsset);
router.post('/files', filesParser, controller.storeFiles);
router.get('/tables', controller.getDataFromTable);
router.post('/payload', controller.processPayload);
router.post('/patients', controller.createPatient);
router.get('/patients', controller.getAllPatients);

export default router;