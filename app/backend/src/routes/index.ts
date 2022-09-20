
import { Router } from 'express';
import AuthRoutes from './Auth';
import TeamRoutes from './Team';
import ChampionshipRoutes from './Championship'
import MatchRouter from './Match'

const router = Router();


AuthRoutes(router);
TeamRoutes(router);
ChampionshipRoutes(router);
MatchRouter(router);

export default router;