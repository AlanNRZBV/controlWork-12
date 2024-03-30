import { Router } from 'express';
import Photo from '../models/Photo';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import { PhotoData } from '../types';

const photosRouter = Router();

photosRouter.get('/', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const photos = await Photo.find().populate('userId', 'usedId displayName');
      if (photos.length === 0) {
        return res.send({ message: 'No photos to load. Add one!', photos });
      }
      return res.send({ message: `Loaded ${photos.length} photos`, photos });
    }

    if ('user' in req.query) {
      const value = req.query.user;

      const photos = await Photo.find({ userId: value as string }).populate('userId', 'usedId displayName');

      if (photos.length === 0) {
        return res.send({ message: 'User has no photos', photos });
      }
      return res.send({ message: `Loaded ${photos.length} photos `, photos });
    }

    return res.send({ warning: `Might be an error`, emptyKey: null });
  } catch (e) {
    next(e);
  }
});

photosRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;
    if (userId) {
      const photoData: PhotoData = {
        userId: userId,
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      };

      const photo = new Photo(photoData);
      await photo.save();

      return res.send({ message: 'Successfully submitted', photo });
    }
    return res.send({ warning: `Might be an error.`, emptyKey: null });
  } catch (e) {
    next(e);
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
  }
});

photosRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const photoId = req.params.id;
    const photo = await Photo.findById(photoId);
    const userIdCheck = await Photo.findOne({ _id: photoId, userId: req.user?.id });
    if (!photo) {
      return res.status(404).send({ message: 'No photo found', photo });
    }
    if (req.user?.role === 'admin' || userIdCheck) {
      const photo = await Photo.findOneAndDelete({ _id: photoId });
      return res.send({ message: 'Successfully delete', photo });
    }
    return res.status(403).send({ message: 'You have no permission for that' });
  } catch (e) {
    next(e);
  }
});

export default photosRouter;
