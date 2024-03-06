import { create } from 'zustand';

type TermsStore = {
  currentTerm: string;
  inputValue: string;
  page: number;
  setCurrentTerm: (term: string) => void;
  setInputValue: (term: string) => void;
  incrementPage: () => void;
  resetPage: () => void;
};

export const useTerms = create<TermsStore>((set) => ({
  currentTerm: '',
  inputValue: '',
  page: 1,
  setCurrentTerm: (term) => {
    set(() => ({ currentTerm: term }));
  },
  setInputValue: (term) => {
    set(() => ({ inputValue: term }));
  },
  incrementPage: () => {
    set((state) => ({ page: state.page + 1 }));
  },
  resetPage: () => {
    set(() => ({ page: 1 }));
  },
}));
