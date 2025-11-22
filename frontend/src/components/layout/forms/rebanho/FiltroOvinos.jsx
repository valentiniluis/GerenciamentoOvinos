import FilterForm from "../FilterForm.jsx";
import FILTER_TYPES from "../../../../util/constants.js";


const FiltroOvinos = ({ onUpdateAttr, onUpdateValue, filter }) => {
  const { attribute } = filter;

  const noFilterApplied = (filter.attribute === 'nenhuma');
  const props = noFilterApplied ? { name: 'nenhuma' } : FILTER_TYPES[attribute];

  return (
    <FilterForm
      defaultFields={inputFilter}
      filterProps={props}
      onUpdate={onUpdateValue}
    />
  );
}

export default FiltroOvinos;