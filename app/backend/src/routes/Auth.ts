
import { Router } from 'express';
import AuthController from '../controller/Auth';
import error_middleware from '../middlewares/error';

const router = Router();

const auth_controller = new AuthController();

function routes(app: typeof router) {
  app.use('/auth', router)

  router.get('/login', auth_controller.login.bind(auth_controller), error_middleware)
}

export default routes;