import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import classes from './ErrorPage.module.css';
import { ReactNode } from 'react';
import Button from '../components/UI/Button';
import { useStore } from 'zustand';
import { useTerms } from '../store/searchStore';

const ErrorPage: React.FC<{ children?: ReactNode }> = (props) => {
  const error = useRouteError();
  const navigate = useNavigate();
  const setCurrentTerm = useStore(useTerms, (state) => state.setCurrentTerm);

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (isRouteErrorResponse(error)) {
    if (error.status === 500) {
      message = error.data.message;
    }

    if (error.status === 404) {
      title = '404 - Not found!';
      message = 'Could not find resource or page.';
    }

    if (error.status > 299) {
      title = `${error.status} - Not found!`;
      message = 'Could not find resource or page.';
    }
  }

  const buttonHandler = () => {
    setCurrentTerm('');
    navigate('/sweeft/');
  };

  return (
    <div className={`${classes.container} ${classes.center}`}>
      {props.children ? (
        props.children
      ) : (
        <>
          <h2>{title}</h2>
          <p>{message}</p>
        </>
      )}
      <Button title="Home" onClick={buttonHandler} />
    </div>
  );
};

export default ErrorPage;
