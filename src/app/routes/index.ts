import { Router } from 'express';
import { StatusRoutesRegister } from './status.route';

const router = Router();

StatusRoutesRegister.register(router);

export default router;
