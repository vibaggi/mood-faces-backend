import { Router } from 'express';
import controller from '../controllers/teams';

const router: Router = Router();

router.get('/test', controller.test);
router.post('/create', controller.criarEquipe)
router.get('/listar/:texto', controller.listarEquipes)


export default router;