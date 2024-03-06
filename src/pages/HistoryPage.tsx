import { useState } from 'react';
import SearchedWords from '../components/SearchedWords';
import classes from './HistoryPage.module.css';
import HistoryGallery from '../components/photos/HistoryGallery';
import { Outlet } from 'react-router-dom';
import { useStore } from 'zustand';
import { useTerms } from '../store/searchStore';

const HistoryPage = () => {
  const resetPage = useStore(useTerms, (state) => state.resetPage);
  const [selectedTerm, setSelectedTerm] = useState<string>('');

  const historyWordHandler = (term: string) => {
    setSelectedTerm(term);
    resetPage();
  };

  return (
    <>
      <Outlet />
      <div className={classes.wrapper}>
        <h2>ძებნის ისტორია</h2>
        <SearchedWords selectHandler={historyWordHandler} />

        <HistoryGallery selectedTerm={selectedTerm} />
      </div>
    </>
  );
};

export default HistoryPage;
