import classes from '../../../styles/TablePagination.module.css';


const TablePagination = ({ pages, updatePages }) => {
  const { current, max } = pages;
  const previousPage = current - 1;
  const nextPage = current + 1;

  const FIRST = 1;

  return (
    <ul className={classes.ulPages}>
      {previousPage > FIRST ? (
        <>
          <li className={classes.pageItems}>
            <button onClick={() => updatePages(FIRST, max)}>{FIRST}</button>
          </li>
          <li>
            <span>. . .</span>
          </li>
        </>
      ) : null}
      {previousPage >= 1 ? (
        <li className={classes.pageItems}>
          <button onClick={() => updatePages(previousPage, max)}>
            {previousPage}
          </button>
        </li>
      ) : null}
      <li className={classes.pageItems}>
        <button disabled>
          {current}
        </button>
      </li>
      {nextPage <= max ? (
        <li className={classes.pageItems}>
          <button onClick={() => updatePages(nextPage, max)}>
            {nextPage}
          </button>
        </li>
      ) : null}
      {nextPage < max ? (
        <>
          <li>
            <span>. . .</span>
          </li>
          <li className={classes.pageItems}>
            <button onClick={() => updatePages(max, max)}>{max}</button>
          </li>
        </>
      ) : null}
    </ul>
  );
}


export default TablePagination;