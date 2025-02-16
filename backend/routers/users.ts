import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import { imagesUpload } from '../multer';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import { UserData } from '../types';

const usersRouter = Router();
const client = new OAuth2Client();

usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {
  try {
    const userData: UserData = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    };

    const user = new User(userData);

    user.generateToken();
    await user.save();

    res.send(user);
  } catch (e) {
    next(e);
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(422).send({ error: 'Email not found!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Password is wrong' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password is correct!', user });
  } catch (e) {
    next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'User successfully deleted' };

    if (!headerValue) {
      return res.send(successMessage);
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send(successMessage);
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.send(successMessage);
    }

    user.generateToken();
    await user.save();
    return res.send(successMessage);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google login error' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Email is not present' });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
        avatar,
      });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Login with google successful', user });
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
