
import { Router } from 'express';

const router = Router();

function routes(app: typeof router) {
  app.use('/auth', router)

  router.get('/')
}

export default routes;