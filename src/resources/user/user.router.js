import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler';
import { me, updateMe } from './user.controllers';

const router = Router();

router.get('/', catchErrors(me));
router.put('/', catchErrors(updateMe));

export default router;
