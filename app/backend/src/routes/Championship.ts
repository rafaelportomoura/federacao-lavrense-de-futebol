
import { Router } from 'express';
import ChampionshipController from '../controller/Championship';
import AuthController from '../controller/Auth';
import error_middleware from '../middlewares/error';
import ChampionshipTeamController from '../controller/ChampionshipTeam';

const router = Router();

const championship_controller = new ChampionshipController();
const auth_controller = new AuthController();
const championship_team_controller = new ChampionshipTeamController();

function routes(app: typeof router) {
  app.use('/championship', router)

  router.post('/', auth_controller.validLoginToken.bind(auth_controller), championship_controller.postChampionship.bind(championship_controller), error_middleware)
  router.get('/', auth_controller.validLoginToken.bind(auth_controller), championship_controller.getChampionships.bind(championship_controller), error_middleware)
  router.get('/:id', auth_controller.validLoginToken.bind(auth_controller), championship_controller.getUniqueChampionship.bind(championship_controller), error_middleware)
  router.put('/:id', auth_controller.validLoginToken.bind(auth_controller), championship_controller.putChampionship.bind(championship_controller), error_middleware)
  router.delete('/:id', auth_controller.validLoginToken.bind(auth_controller), championship_controller.deleteChampionship.bind(championship_controller), error_middleware)
  router.patch('/:championship_id/champion/team/:team_id', auth_controller.validLoginToken.bind(auth_controller), championship_controller.addChampionTeam.bind(championship_controller), error_middleware)
  router.patch('/:id/team', auth_controller.validLoginToken.bind(auth_controller), championship_team_controller.patchChampionshipTeam.bind(championship_team_controller), error_middleware);
  router.delete('/:id/team', auth_controller.validLoginToken.bind(auth_controller), championship_team_controller.deleteChampionshipTeam.bind(championship_team_controller), error_middleware)
  router.get('/:id/team', auth_controller.validLoginToken.bind(auth_controller), championship_team_controller.getChampionshipTeams.bind(championship_team_controller), error_middleware)
}

export default routes;