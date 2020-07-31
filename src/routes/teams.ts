import { Router } from 'express';
import controller from '../controllers/teams';

const router: Router = Router();

router.get('/test', controller.test);



export default router;