import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import classes from './RootLayout.module.css';
import { useEffect } from 'react';

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/sweeft/' || location.pathname === '/sweeft')
      navigate('home');
  }, []);

  return (
    <>
      <Header />
      <main className={classes.container}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
