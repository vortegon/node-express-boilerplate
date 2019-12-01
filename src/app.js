import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import itemRouter from './resources/item/item.router';
import listRouter from './resources/list/list.router';
import userRouter from './resources/user/user.router';
import { signup, signin, protect } from './utils/auth';
import { catchErrors, notFound, developmentErrors, productionErrors } from './utils/errorHandler';

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/signup', catchErrors(signup));
app.post('/signin', catchErrors(signin));

app.use('/api', catchErrors(protect));
app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);
app.use('/api/list', listRouter);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
}

// production error handler
app.use(productionErrors);
module.exports = app;
