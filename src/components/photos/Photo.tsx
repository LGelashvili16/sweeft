import React from 'react';
import classes from './Photo.module.css';
import { PhotoType } from '../../models/models';

const Photo: React.FC<{
  photo: PhotoType;
}> = (props) => {
  return (
    <div className={classes.photo}>
      <div className={classes.img}>
        <img src={props.photo.urls.regular} alt={props.photo.alt_description} />
      </div>
    </div>
  );
};

export default Photo;
