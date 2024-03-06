import React, { forwardRef } from 'react';
import classes from './Photo.module.css';
import { PhotoType } from '../../models/models';

const Photo: React.ForwardRefRenderFunction<
  HTMLDivElement,
  {
    photo: PhotoType;
  }
> = (props, ref) => {
  return (
    <div className={classes.photo} ref={ref}>
      <div className={classes.img}>
        <img src={props.photo.urls.regular} alt={props.photo.alt_description} />
      </div>
    </div>
  );
};

export default forwardRef(Photo);
