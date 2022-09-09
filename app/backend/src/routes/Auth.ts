
import { Router } from 'express';
import AuthController from '../controller/Auth';

const router = Router();

const auth_controller = new AuthController();

function routes(app: typeof router) {
  app.use('/auth', router)

  router.get('/login', auth_controller.login.bind(auth_controller))
}

export default routes;