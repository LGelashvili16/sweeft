import { useQuery } from '@tanstack/react-query';
import { fetchSearchedPhotos } from '../utils/http';
import { useEffect, useState } from 'react';
import { PhotoType } from '../models/models';
import { splitData } from '../utils/helpers';
import { useTerms } from '../store/searchStore';
import { useStore } from 'zustand';

const useFetchPhotos = (currentTerm: string, page: number) => {
  const [column1, setColumn1] = useState<PhotoType[]>([]);
  const [column2, setColumn2] = useState<PhotoType[]>([]);
  const [column3, setColumn3] = useState<PhotoType[]>([]);
  const resetPage = useStore(useTerms, (state) => state.resetPage);

  useEffect(() => {
    setColumn1([]);
    setColumn2([]);
    setColumn3([]);
    resetPage();
  }, [currentTerm]);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['searched', currentTerm, page],
    queryFn: () => fetchSearchedPhotos(currentTerm, page),
    staleTime: Infinity,
    enabled: currentTerm.length > 0,
  });

  useEffect(() => {
    if (data) {
      const [newColumn1, newColumn2, newColumn3] = splitData(data.results);
      setColumn1((prevColumn) => [...prevColumn, ...newColumn1]);
      setColumn2((prevColumn) => [...prevColumn, ...newColumn2]);
      setColumn3((prevColumn) => [...prevColumn, ...newColumn3]);
    }
  }, [data]);

  return {
    column1,
    column2,
    column3,
    isLoading,
    error,
    isError,
  };
};

export default useFetchPhotos;
