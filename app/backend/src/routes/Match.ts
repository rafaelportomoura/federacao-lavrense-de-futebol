
import { Router } from 'express';
import MatchController from '../controller/Match';
import AuthController from '../controller/Auth';
import error_middleware from '../middlewares/error';

const router = Router();

const team_controller = new MatchController();
const auth_controller = new AuthController();

function routes(app: typeof router) {
  app.use('/match', router)

  router.post('/', auth_controller.validLoginToken.bind(auth_controller), team_controller.postMatch.bind(team_controller), error_middleware)
  router.get('/:id', auth_controller.validLoginToken.bind(auth_controller), team_controller.getUniqueMatch.bind(team_controller), error_middleware)
  router.put('/:id', auth_controller.validLoginToken.bind(auth_controller), team_controller.putMatch.bind(team_controller), error_middleware)
  router.delete('/:id', auth_controller.validLoginToken.bind(auth_controller), team_controller.deleteMatch.bind(team_controller), error_middleware)
  router.patch('/:id/team', auth_controller.validLoginToken.bind(auth_controller), team_controller.patchTeams.bind(team_controller), error_middleware)
}

export default routes;