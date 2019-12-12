import { Router } from 'express';

import TripController from './app/controllers/TripController';

const routes = new Router();

routes.post('/trips', TripController.store);

export default routes;
