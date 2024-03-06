import React, { useCallback, useRef } from 'react';
import classes from './HistoryGallery.module.css';
import Photo from './Photo';
import { PhotoType } from '../../models/models';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorPage from '../../pages/ErrorPage';
import { useStore } from 'zustand';
import { useTerms } from '../../store/searchStore';
import useFetchPhotos from '../../hooks/useFetchPhotos';

const PhotosGallery: React.FC<{
  selectedTerm: string;
}> = ({ selectedTerm }) => {
  const page = useStore(useTerms, (state) => state.page);
  const incrementPage = useStore(useTerms, (state) => state.incrementPage);

  const { column1, column2, column3, isLoading, isError, error } =
    useFetchPhotos(selectedTerm, page);

  const lastElementObserver = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (lastElementObserver.current) lastElementObserver.current.disconnect();

      lastElementObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            incrementPage();
          }
        },
        { rootMargin: '100px', threshold: 0.2 }
      );

      if (node) lastElementObserver.current.observe(node);
    },
    [isLoading]
  );

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
          <h2>{error && error.message}</h2>
        </div>
      </ErrorPage>
    );
  }

  if (column1 && column2 && column3) {
    content = (
      <div className={classes['photos-grid']}>
        <div className={classes['photos-column']}>
          {column1.map((photo: PhotoType, index) => {
            if (column1.length === index + 1) {
              return (
                <Link key={photo.id} to={`photo/${photo.id}`}>
                  <Photo photo={photo} ref={lastElementRef} />
                </Link>
              );
            } else {
              return (
                <Link key={photo.id} to={`photo/${photo.id}`}>
                  <Photo photo={photo} />
                </Link>
              );
            }
          })}
        </div>

        <div className={classes['photos-column']}>
          {column2.map((photo: PhotoType) => {
            return (
              <Link key={photo.id} to={`photo/${photo.id}`}>
                <Photo photo={photo} />
              </Link>
            );
          })}
        </div>

        <div className={classes['photos-column']}>
          {column3.map((photo: PhotoType) => {
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
    <div>
      {selectedTerm.length > 0 && (
        <div className={classes['photos-wrapper']}>
          <h2>ძებნის შედეგები</h2>
          {content}
        </div>
      )}

      {selectedTerm.length === 0 && <p>აირჩიეთ საძიებო სიტყვა</p>}
    </div>
  );
};

export default PhotosGallery;
