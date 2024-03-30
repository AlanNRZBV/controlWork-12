import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Photo from './models/Photo';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    const collections = ['users', 'photos'];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        email: 'user@test.com',
        password: '5tr0ngPswrd',
        token: crypto.randomUUID(),
        role: 'client',
        displayName: 'us0r',
        avatar: 'fixtures/avatar_user.png',
      },
      {
        email: 'admin@test.com',
        password: '5tr0ngPswrd',
        token: crypto.randomUUID(),
        role: 'admin',
        displayName: 'Mr.Anderson',
        avatar: 'fixtures/avatar_admin.png',
      },
    ]);

    const defaultUser = await User.findOne({ email: 'user@test.com' });
    const adminUser = await User.findOne({ email: 'admin@test.com' });

    await Photo.create([
      {
        userId: defaultUser?._id,
        title: 'Default user test photo with very long title',
        image: '/fixtures/user_photo_1.jpg',
      },
      {
        userId: defaultUser?._id,
        title: 'Default user photo',
        image: '/fixtures/user_photo_2.jpg',
      },
      {
        userId: defaultUser?._id,
        title: 'vr shrt ttl',
        image: '/fixtures/user_photo_3.jpg',
      },
      {
        userId: defaultUser?._id,
        title: 'Unexpected copy',
        image: '/fixtures/user_photo_3.jpg',
      },
      {
        userId: adminUser?._id,
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: '/fixtures/admin_photo_1.jpg',
      },
      {
        userId: adminUser?._id,
        title: 'Admin photo',
        image: '/fixtures/admin_photo_2.jpg',
      },
      {
        userId: adminUser?._id,
        title: 'Big cat',
        image: '/fixtures/admin_photo_3.jpg',
      },
      {
        userId: adminUser?._id,
        title: 'Another cat',
        image: '/fixtures/admin_photo_4.jpg',
      },
    ]);

    await db.close();
  } catch (e) {
    console.log('Collection were missing, skipping drop');
  }
};

void run();
