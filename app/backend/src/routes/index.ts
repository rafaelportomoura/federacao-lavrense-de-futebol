
import { Router } from 'express';
import AuthRoutes from './Auth';
import TeamRoutes from './Team';
import ChampionshipRoutes from './Championship'
import MatchRouter from './Match'
import GoalRouter from './Goal';

const router = Router();


AuthRoutes(router);
TeamRoutes(router);
ChampionshipRoutes(router);
MatchRouter(router);
GoalRouter(router);

export default router;