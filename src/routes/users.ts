import { Router } from 'express';
import controller from '../controllers/users';
// import filesParser from '../lib/handlers/files_parser';

const router: Router = Router();

router.post('/create', controller.createUser);
router.get('/login', controller.login);
// router.use(controller.authentication);

router.get('/users/listar/:texto', controller.listarUsuarios)

export default router;