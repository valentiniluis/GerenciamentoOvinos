import FilterForm from "../FilterForm.jsx";
import FILTER_TYPES from "../../../../util/constants.js";


const FiltroUsuarios = ({ filter, updateFilter }) => {
  const noFilterApplied = (filter.filterProp === 'nenhuma');

  const props = noFilterApplied ? { name: 'nenhuma' } : FILTER_TYPES[filter.filterProp]

  return <FilterForm defaultFields={inputFilter} setFilter={updateFilter} filterProps={props} />
}

export default FiltroUsuarios;