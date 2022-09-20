
import { Router } from 'express';
import AuthController from '../controller/Auth';
import error_middleware from '../middlewares/error';
import GoalController from '../controller/Goals';

const router = Router();

const goal_controller = new GoalController();
const auth_controller = new AuthController();

function routes(app: typeof router) {
  app.use('/goal', router)

  router.post('/', auth_controller.validLoginToken.bind(auth_controller), goal_controller.postGoal.bind(goal_controller), error_middleware)
  router.delete('/:id', auth_controller.validLoginToken.bind(auth_controller), goal_controller.deleteGoal.bind(goal_controller), error_middleware)
}

export default routes;