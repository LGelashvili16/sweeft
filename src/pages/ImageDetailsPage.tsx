import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/UI/Modal';
import classes from './ImageDetailsPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchPhoto } from '../utils/http';
import LoadingIndicator from '../components/UI/LoadingIndicator';

const ImageDetailsPage = () => {
  const params = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat('en-US');

  const { data, isLoading } = useQuery({
    queryKey: ['searched', `image/${params.id}`],
    queryFn: () => params.id && fetchPhoto(params.id),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="loader">
        <LoadingIndicator />
      </div>
    );
  }

  const downloads = formatter.format(data.downloads);
  const views = formatter.format(data.views);
  const likes = formatter.format(data.likes);

  return (
    <Modal onClose={() => navigate('../')}>
      <div className={classes['modal-content']}>
        <div className={classes.image}>
          <img src={data.urls.regular} alt={data.alt_description} />
        </div>
        <div className={classes.statistics}>
          <p>
            გადმოწერები: <span>{downloads}</span>
          </p>
          <p>
            ნახვები: <span>{views}</span>
          </p>
          <p>
            მოწონებები: <span>{likes}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};
export default ImageDetailsPage;
