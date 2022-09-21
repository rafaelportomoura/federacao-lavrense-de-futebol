
import { Router } from 'express';
import MatchController from '../controller/Match';
import AuthController from '../controller/Auth';
import error_middleware from '../middlewares/error';

const router = Router();

const match_controller = new MatchController();
const auth_controller = new AuthController();

function routes(app: typeof router) {
  app.use('/match', router)

  router.post('/', auth_controller.validLoginToken.bind(auth_controller), match_controller.postMatch.bind(match_controller), error_middleware)
  router.get('/:id', auth_controller.validLoginToken.bind(auth_controller), match_controller.getUniqueMatch.bind(match_controller), error_middleware)
  router.put('/:id', auth_controller.validLoginToken.bind(auth_controller), match_controller.putMatch.bind(match_controller), error_middleware)
  router.delete('/:id', auth_controller.validLoginToken.bind(auth_controller), match_controller.deleteMatch.bind(match_controller), error_middleware)
  router.patch('/:id/team', auth_controller.validLoginToken.bind(auth_controller), match_controller.patchTeams.bind(match_controller), error_middleware)
  router.get('/championship/:championship_id', auth_controller.validLoginToken.bind(auth_controller), match_controller.getMatchesByChampionshipId.bind(match_controller), error_middleware)
}

export default routes;