import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler';
import controllers from './list.controllers';

const router = Router();

// /api/list
router
  .route('/')
  .get(catchErrors(controllers.getMany))
  .post(catchErrors(controllers.createOne));

// /api/list/:id
router
  .route('/:id')
  .get(catchErrors(controllers.getOne))
  .put(catchErrors(controllers.updateOne))
  .delete(catchErrors(controllers.removeOne));

export default router;
