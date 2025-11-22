import { useState } from 'react';
import { useDebounce } from 'react-use';
import searchIcon from '/search_icon.svg';
import classes from '../../styles/Filter.module.css';

const InputFilter = ({ className, updateFilter, ...inputProps }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // depois de 500ms do termo ser mudado, o filtro é atualizado e a nova request ocorre.
  const DEBOUNCE_MS = 500;
  useDebounce(() => updateFilter(searchTerm), DEBOUNCE_MS, [searchTerm]);

  let inputCssClass = classes.filterInput;
  if (className !== undefined) inputCssClass += ' ' + className;

  const handleChange = (event) => setSearchTerm(event.target.value);

  return (
    <div className={classes.filterContainer}>
      <input className={inputCssClass} {...inputProps} value={searchTerm} onChange={handleChange} />
      <button className={classes.filterBtn} disabled>
        <img className={classes.searchIcon} src={searchIcon} alt="Search Icon" />
      </button>
    </div>
  );
}

export default InputFilter;