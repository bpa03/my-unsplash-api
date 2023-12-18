import { Router } from 'express';
import { StatusRoutesRegister } from './status.route';
import { UsersRoutesRegister } from './users.route';

const router = Router();

StatusRoutesRegister.register(router);
UsersRoutesRegister.register(router);

export default router;
