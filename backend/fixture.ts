import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';

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
    const collections = ['users', 'photo'];

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
        email: 'user_1@test.com',
        password: '5tr0ngPswrd',
        token: crypto.randomUUID(),
        role: 'client',
        displayName: 'us0r_1',
        avatar: 'fixtures/avatar_user.png',
      },

      {
        email: 'user_2@test.com',
        password: '5tr0ngPswrd',
        token: crypto.randomUUID(),
        role: 'client',
        displayName: 'us0r_2',
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
    const defaultUser_1 = await User.findOne({ email: 'user_1@test.com' });
    const defaultUser_2 = await User.findOne({ email: 'user_2@test.com' });
    const adminUser = await User.findOne({ email: 'admin@test.com' });

    await db.close();
  } catch (e) {
    console.log('Collection were missing, skipping drop');
  }
};

void run();
