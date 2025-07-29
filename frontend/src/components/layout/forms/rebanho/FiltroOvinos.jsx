import FilterForm from "../FilterForm.jsx";
import FILTER_TYPES from "../../../../util/filterTypes.js";


const FiltroOvinos = ({ filter, updateFilter }) => {
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
        { value: 'brinco_num', name: 'Brinco do Ovino' },
        { value: 'brinco_mae', name: 'Brinco da Mãe do Ovino' },
        { value: 'raca', name: 'Raça' },
        { value: 'sexo', name: 'Sexo' },
        { value: 'finalidade', name: 'Finalidade' },
        { value: 'abatido', name: 'Abatido' }
      ]
    }
  }];

  const props = noFilterApplied ? { name: 'nenhuma' } : FILTER_TYPES[filter.filterProp]

  return <FilterForm defaultFields={inputFilter} setFilter={updateFilter} filterProps={props} />
}

export default FiltroOvinos;