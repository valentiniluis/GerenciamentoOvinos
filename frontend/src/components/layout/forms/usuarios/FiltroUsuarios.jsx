import { useState, useEffect } from "react";
import FilterForm from "../FilterForm.jsx";

import FILTER_TYPES from "../../../../util/filterTypes.js";
import api from '../../../../api/request.js';


const FiltroUsuarios = ({ updateData, page, updatePages }) => {
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
        { value: 'email', name: 'E-Mail' },
        { value: 'nome', name: 'Nome' }
      ]
    }
  }];

  useEffect(() => {
    async function fetchData() {
      const { filterProp, filterValue } = filter;
      const hasFilterSet = (filterProp !== 'nenhuma' && filterValue);
      try {
        let url = '/usuarios?page=' + page;
        if (hasFilterSet) {
          const queryParam = `&${filterProp}=${filterValue}`;
          url += queryParam;
        }
        const response = await api.get(url);
        const data = response.data;
        updateData(data.users);
        updatePages(page, data.pages);
      } catch (err) {
        updateData({ 
          isError: true, 
          message: err.response.data.message || 'Não foi possível extrair usuários'
        });
      }
    }
    fetchData();
  }, [filter, updateData, page, updatePages]);

  const props = noFilterApplied ? { name: 'nenhuma' } : FILTER_TYPES[filter.filterProp]

  return <FilterForm defaultFields={inputFilter} setFilter={setFilter} filterProps={props} />
}

export default FiltroUsuarios;