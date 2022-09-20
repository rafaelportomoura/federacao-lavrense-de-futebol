
import { Router } from 'express';
import AuthRoutes from './Auth';
import TeamRoutes from './Team';
import ChampionshipRoutes from './Championship'

const router = Router();


AuthRoutes(router);
TeamRoutes(router);
ChampionshipRoutes(router);

export default router;