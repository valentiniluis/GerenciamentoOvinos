import FilterForm from "../FilterForm.jsx";
import FILTER_TYPES from "../../../../util/filterTypes.js";


const FiltroUsuarios = ({ filter, updateFilter }) => {
  const noFilterApplied = (filter.filterProp === 'nenhuma');

  const inputFilter = [{
    wrapper: {
      size: 'large-input'
    },
    inputProps: {
      label: 'Condição de Filtro (Opcional)',
      id: 'filtro',
      name: 'filtro',
      onChange: (event) => updateFilter({ filterProp: event.target.value, filterValue: '' }),
      options: [
        { value: 'nenhuma', name: 'Nenhuma' },
        { value: 'email', name: 'E-Mail' },
        { value: 'nome', name: 'Nome' }
      ]
    }
  }];

  const props = noFilterApplied ? { name: 'nenhuma' } : FILTER_TYPES[filter.filterProp]

  return <FilterForm defaultFields={inputFilter} setFilter={updateFilter} filterProps={props} />
}

export default FiltroUsuarios;