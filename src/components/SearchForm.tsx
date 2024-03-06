import React, { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import classes from './SearchForm.module.css';
import { useStore } from 'zustand';
import { useTerms } from '../store/searchStore';
import useLocalStorage from '../hooks/useLocalStorage';

const SearchForm = () => {
  const setCurrentTerm = useStore(useTerms, (state) => state.setCurrentTerm);
  const inputValue = useStore(useTerms, (state) => state.inputValue);
  const setInputValue = useStore(useTerms, (state) => state.setInputValue);
  const resetPage = useStore(useTerms, (state) => state.resetPage);
  const debouncedSearch = useDebounce(inputValue);
  const [, setValue] = useLocalStorage('searchedTerms');

  useEffect(() => {
    setCurrentTerm(debouncedSearch.trim());
    resetPage();
    if (debouncedSearch.trim().length > 0) {
      setValue(debouncedSearch.trim());
    }
  }, [debouncedSearch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <label htmlFor="search">ძებნა</label>
        <input
          type="search"
          id="search"
          value={inputValue}
          onChange={inputChangeHandler}
        />
      </div>
    </form>
  );
};

export default SearchForm;
