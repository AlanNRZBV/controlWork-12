import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import NotFound from '../components/UI/NotFound/NotFound.tsx';
import Login from '../features/Users/Login.tsx';
import Register from '../features/Users/Register.tsx';
import Photos from '../features/Photos/Photos.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Photos />,
      },
      {
        path: '/:userId/photos',
        element: <Photos />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
