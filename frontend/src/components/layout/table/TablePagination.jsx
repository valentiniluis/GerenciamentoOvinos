import classes from '../../../styles/TablePagination.module.css';


const TablePagination = ({ pages, updatePage }) => {
  const { current, max } = pages;
  if (max === 1) return null;

  const previousPage = current - 1;
  const nextPage = current + 1;
  const FIRST = 1;

  return (
    <ul className={classes.ulPages}>
      {previousPage > FIRST ? (
        <>
          <li className={classes.pageItems}>
            <button onClick={() => updatePage(FIRST)}>{FIRST}</button>
          </li>
          { previousPage - 1 > FIRST ? (
            <li>
              <span>. . .</span>
            </li>
            ) : null }
        </>
      ) : null}
      {previousPage >= 1 ? (
        <li className={classes.pageItems}>
          <button onClick={() => updatePage(previousPage)}>
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
          <button onClick={() => updatePage(nextPage)}>
            {nextPage}
          </button>
        </li>
      ) : null}
      {nextPage < max ? (
        <>
          { nextPage + 1 < max ? (
            <li>
              <span>. . .</span>
            </li>
            ) : null }
          <li className={classes.pageItems}>
            <button onClick={() => updatePage(max)}>{max}</button>
          </li>
        </>
      ) : null}
    </ul>
  );
}


export default TablePagination;