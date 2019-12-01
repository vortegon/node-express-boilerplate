import mongoose from 'mongoose';

export const connect = (url = process.env.DATABASE, opts = {}) =>
  mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
