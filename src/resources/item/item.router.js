import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler';
import controllers from './item.controllers';

const router = Router();

// /api/item
router
  .route('/')
  .get(catchErrors(controllers.getMany))
  .post(catchErrors(controllers.createOne));

// /api/item/:id
router
  .route('/:id')
  .get(catchErrors(controllers.getOne))
  .put(catchErrors(controllers.updateOne))
  .delete(catchErrors(controllers.removeOne));

export default router;
