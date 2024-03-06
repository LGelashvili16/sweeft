import classes from './SearchedWords.module.css';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './UI/Button';
import { useState } from 'react';

const SearchedWords: React.FC<{
  selectHandler: (term: string) => void;
}> = ({ selectHandler }) => {
  const [storedValues, , removeHandler] =
    useLocalStorage<string>('searchedTerms');
  const [isSelected, setIsSelected] = useState<string | null>(null);

  return (
    <div className={classes['terms-wrapper']}>
      <Button
        title="ისტორიის გასუფთავება"
        secondary={true}
        onClick={removeHandler}
      />

      <div className={classes.terms}>
        {storedValues.length > 0 &&
          storedValues.map((term) => (
            <input
              key={term}
              type="button"
              value={term}
              onClick={() => {
                setIsSelected(term);
                selectHandler(term);
              }}
              disabled={isSelected !== null && isSelected === term}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchedWords;
