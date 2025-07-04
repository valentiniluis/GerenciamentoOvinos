import { useState, useEffect } from "react";
import FilterForm from "../FilterForm.jsx";

import FILTER_TYPES from "../../../../util/filterTypes.js";
import api from '../../../../api/request.js';


const FiltroOvinos = ({ updateSheepData }) => {
  const [filter, setFilter] = useState({ filterProp: 'nenhuma', filterValue: '' });
  const noFilterApplied = (filter.filterProp === 'nenhuma');

  const inputFilter = [{
    wrapper: {
      size: 'large-input'
    },
    inputProps: {
      label: 'Condição de Filtro (Opcional)',
      id: 'filtro',
      name: 'filtro',
      onChange: (event) => setFilter({ filterProp: event.target.value }),
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

  useEffect(() => {
    async function fetchData() {
      const { filterProp, filterValue } = filter;
      const hasFilterSet = (filterProp !== 'nenhuma');
      if (hasFilterSet && !filterValue) return;
      try {
        let url = '/rebanho';
        if (hasFilterSet) {
          const queryParam = `?${filterProp}=${filterValue}`;
          url += queryParam;
        }
        const response = await api.get(url);
        const data = response.data;
        updateSheepData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [filter, updateSheepData]);

  const props = noFilterApplied ? { name: 'nenhuma' } : FILTER_TYPES[filter.filterProp]

  return <FilterForm defaultFields={inputFilter} setFilter={setFilter} filterProps={props} />
}

export default FiltroOvinos;