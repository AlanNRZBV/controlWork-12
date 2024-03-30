import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { PersistGate } from 'redux-persist/integration/react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants.ts';
import { addInterceptors } from './axiosApi.ts';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </PersistGate>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
