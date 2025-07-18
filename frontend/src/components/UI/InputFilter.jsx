import { useState } from 'react';
import { useDebounce } from 'react-use';
import searchIcon from '/search_icon.svg';
import classes from '../../styles/Filter.module.css';

const InputFilter = ({ className, updateFilter, ...inputProps }) => {
  const [searchText, setSearchText] = useState('');

  // depois de 500ms do termo ser mudado, o filtro é atualizado e a nova request ocorre.
  const DEBOUNCE_MS = 500;
  useDebounce(() => updateFilter(searchText), DEBOUNCE_MS, [searchText]);

  let inputCssClass = classes.filterInput;
  if (className !== undefined) inputCssClass += ' ' + className;

  const handleChange = (event) => setSearchText(event.target.value);

  return (
    <div className={classes.filterContainer}>
      <input className={inputCssClass} {...inputProps} value={searchText} onChange={handleChange} />
      <button className={classes.filterBtn} disabled>
        <img className={classes.searchIcon} src={searchIcon} alt="Search Icon" />
      </button>
    </div>
  );
}

export default InputFilter;