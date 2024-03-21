import { useState } from 'react';
import SearchedWords from '../components/SearchedWords';
import classes from './HistoryPage.module.css';
import HistoryGallery from '../components/photos/HistoryGallery';
import { Outlet } from 'react-router-dom';
import { useStore } from 'zustand';
import { useTerms } from '../store/searchStore';

const HistoryPage = () => {
  const resetPage = useStore(useTerms, (state) => state.resetPage);
  const [showGallery, setShowGallery] = useState<boolean>(true);
  const [selectedTerm, setSelectedTerm] = useState<string>('');

  const historyWordHandler = (term: string) => {
    setSelectedTerm(term);
    resetPage();
  };

  const hideHistoryGalleryHandler = () => {
    setShowGallery(false);
  };

  return (
    <>
      <Outlet />
      <div className={classes.wrapper}>
        <h2>ძებნის ისტორია</h2>
        <SearchedWords
          selectHandler={historyWordHandler}
          hideGallery={hideHistoryGalleryHandler}
        />

        {showGallery && <HistoryGallery selectedTerm={selectedTerm} />}
      </div>
    </>
  );
};

export default HistoryPage;
