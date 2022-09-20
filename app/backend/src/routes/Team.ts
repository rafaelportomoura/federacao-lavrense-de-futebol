
import { Router } from 'express';
import TeamController from '../controller/Team';
import AuthController from '../controller/Auth';
import error_middleware from '../middlewares/error';

const router = Router();

const team_controller = new TeamController();
const auth_controller = new AuthController();

function routes(app: typeof router) {
  app.use('/team', router)

  router.post('/', auth_controller.validLoginToken.bind(auth_controller), team_controller.postTeam.bind(team_controller), error_middleware)
  router.get('/', auth_controller.validLoginToken.bind(auth_controller), team_controller.getTeams.bind(team_controller), error_middleware)
  router.get('/:id', auth_controller.validLoginToken.bind(auth_controller), team_controller.getUniqueTeam.bind(team_controller), error_middleware)
  router.put('/:id', auth_controller.validLoginToken.bind(auth_controller), team_controller.putTeam.bind(team_controller), error_middleware)
  router.delete('/:id', auth_controller.validLoginToken.bind(auth_controller), team_controller.deleteTeam.bind(team_controller), error_middleware)
}

export default routes;