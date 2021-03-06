import { Router } from 'express';
import controller from '../controllers/teams';

const router: Router = Router();

router.get('/test', controller.test);
router.post('/create', controller.criarEquipe)
router.get('/listar/porusuario/:login', controller.listarEquipesPorUsuario)
router.get('/listar/:texto', controller.listarEquipes)
router.post('/evaluate', controller.avaliarDia)


export default router;