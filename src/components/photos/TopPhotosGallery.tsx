import React from 'react';
import classes from './TopPhotosGallery.module.css';
import Photo from './Photo';
import { PhotoType } from '../../models/models';
import { splitData } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTopPhotos } from '../../utils/http';
import ErrorPage from '../../pages/ErrorPage';
import LoadingIndicator from '../UI/LoadingIndicator';

const TopPhotosGallery: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['top-photos'],
    queryFn: fetchTopPhotos,
    staleTime: Infinity,
  });

  let content;

  if (isLoading) {
    content = (
      <div className="loader">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorPage>
        <div>
          <h2>{error.message}</h2>
        </div>
      </ErrorPage>
    );
  }

  if (data) {
    const [newColumn1, newColumn2, newColumn3] = splitData(data);

    content = (
      <div className={classes['photos-grid']}>
        <div className={classes['photos-column']}>
          {newColumn1.map((photo: PhotoType) => {
            return (
              <Link key={photo.id} to={`photo/${photo.id}`}>
                <Photo photo={photo} />
              </Link>
            );
          })}
        </div>

        <div className={classes['photos-column']}>
          {newColumn2.map((photo: PhotoType) => {
            return (
              <Link key={photo.id} to={`photo/${photo.id}`}>
                <Photo photo={photo} />
              </Link>
            );
          })}
        </div>

        <div className={classes['photos-column']}>
          {newColumn3.map((photo: PhotoType) => {
            return (
              <Link key={photo.id} to={`photo/${photo.id}`}>
                <Photo photo={photo} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={classes['photos-wrapper']}>
      <h2>პოპულარული ტოპ 20 სურათი</h2>
      {content}
    </div>
  );
};

export default TopPhotosGallery;
