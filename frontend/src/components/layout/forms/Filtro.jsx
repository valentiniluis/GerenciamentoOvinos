import FilterForm from "./FilterForm.jsx";
import { FILTER_TYPES, filtroGrupos, filtroOvinos, filtroUsuarios } from "../../../util/constants.js";


const filtros = {
  rebanho: filtroOvinos,
  grupos: filtroGrupos,
  usuarios: filtroUsuarios
};

const Filtro = ({ setFilter, setPage, filter, type }) => {
  const { attribute } = filter;

  function handleUpdateFilterAttribute(attribute) {
    setFilter({ attribute, value: '' });
    setPage(1);
  }

  function handleUpdateFilterValue(value) {
    setFilter(prev => ({ ...prev, value }));
    setPage(1);
  }

  const inputFilter = [...filtros[type]];
  inputFilter.forEach(filter => filter.inputProps.onChange = (event) => handleUpdateFilterAttribute(event.target.value));
  
  const noFilterApplied = (filter.attribute === 'nenhuma');
  const props = noFilterApplied ? { name: 'nenhuma' } : FILTER_TYPES[attribute];

  return (
    <FilterForm
      defaultFields={inputFilter}
      filterProps={props}
      onUpdate={handleUpdateFilterValue}
    />
  );
}

export default Filtro;