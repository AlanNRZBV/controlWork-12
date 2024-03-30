import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/Users/usersSlice.ts';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cocktailsReducer } from '../features/Cocktails/cocktailsSlice.ts';

const usersPersistConfig = {
  key: 'spotify:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  cocktails: cocktailsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
