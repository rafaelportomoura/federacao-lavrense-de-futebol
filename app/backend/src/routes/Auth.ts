
import { Router } from 'express';
import AuthController from '../controller/Auth';
import error_middleware from '../middlewares/error';

const router = Router();

const auth_controller = new AuthController();

function routes(app: typeof router) {
  app.use('/auth', router)

  router.post('/create', auth_controller.postUser.bind(auth_controller), error_middleware)
  router.post('/login', auth_controller.login.bind(auth_controller), error_middleware)
  router.post('/password', auth_controller.validLoginToken.bind(auth_controller), auth_controller.changePassword.bind(auth_controller), error_middleware)
}

export default routes;