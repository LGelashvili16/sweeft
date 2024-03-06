import { Outlet } from 'react-router-dom';
import { useStore } from 'zustand';
import { useTerms } from '../store/searchStore';
import TopPhotosGallery from '../components/photos/TopPhotosGallery';
import SearchedGallery from '../components/photos/SearchedGallery';

const HomePage = () => {
  const currentTerm = useStore(useTerms, (state) => state.currentTerm);

  return (
    <>
      <Outlet />
      <SearchedGallery />
      {currentTerm.length === 0 && <TopPhotosGallery />}
    </>
  );
};

export default HomePage;
