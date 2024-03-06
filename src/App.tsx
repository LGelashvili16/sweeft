import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import ErrorPage from './pages/ErrorPage';
import ImageDetailsPage from './pages/ImageDetailsPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';

const router = createBrowserRouter([
  {
    path: '/sweeft/',
    element: (
      <>
        <RootLayout />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
        children: [
          {
            path: 'photo/:id',
            element: <ImageDetailsPage />,
          },
        ],
      },

      {
        path: 'history',
        element: <HistoryPage />,
        children: [
          {
            path: 'photo/:id',
            element: <ImageDetailsPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
