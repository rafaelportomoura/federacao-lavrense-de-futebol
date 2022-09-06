
import { Router } from 'express';
import AuthRoutes from './Auth';

const router = Router();


AuthRoutes(router);


export default router;