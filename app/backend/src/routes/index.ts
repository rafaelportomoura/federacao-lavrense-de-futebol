
import { Router } from 'express';
import AuthRoutes from './Auth';
import TeamRoutes from './Team';

const router = Router();


AuthRoutes(router);
TeamRoutes(router);

export default router;