import searchIcon from '../../../../public/search_icon.svg';
import classes from '../../../styles/Filter.module.css';

const InputFilter = ({ className, ...inputProps }) => {

  let inputCssClass = classes.filterInput;
  if (className !== undefined) inputCssClass += ' ' + className;

  return (
    <div className={classes.filterContainer}>
      <input className={inputCssClass} {...inputProps} />
      <button className={classes.filterBtn}>
        <img className={classes.searchIcon} src={searchIcon} alt="Search Icon" />
      </button>
    </div>
  );
}

export default InputFilter;