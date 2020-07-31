import { Router } from 'express';
import controller from '../controllers/users';
// import filesParser from '../lib/handlers/files_parser';

const router: Router = Router();

router.post('/create', controller.createUser);
router.get('/login', controller.login);
router.use(controller.authentication);


export default router;