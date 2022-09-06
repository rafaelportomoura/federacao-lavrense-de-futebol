
import { Router } from 'express';
import AuthRoutes from './Auth';
import InitDB from '../database/mysql';

const router = Router();

InitDB(() => {
  AuthRoutes(router);
})


export default router;