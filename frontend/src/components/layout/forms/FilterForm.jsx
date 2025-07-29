import RenderFields from "./RenderFields.jsx";
import InputFilter from "../../UI/InputFilter.jsx";
import SelectFilter from "../../UI/SelectFilter.jsx";


const FilterForm = ({ defaultFields, setFilter, filterProps }) => {
  const { name: filterProp, options } = filterProps;

  const updateFilter = (value) => setFilter(prevFilter => ({ ...prevFilter, filterValue: value }));

  const noFilterApplied = (filterProp === 'nenhuma');

  return (
    <form className="medium-input">
      <RenderFields fields={defaultFields} />
      {noFilterApplied ? null : (
        <div className="py-4">
          {options === undefined 
          // Ao mudar a key dos componentes abaixo, eles são re-executados como na sua primeira execução.
          // Com isso, o valor e state dos filtros é resetado quando a filterProp é modificada
            ? <InputFilter key={filterProp} {...filterProps} updateFilter={updateFilter} />
            : <SelectFilter key={filterProp} {...filterProps} updateFilter={updateFilter} />
          }
        </div>
      )
      }
    </form>
  );
}

export default FilterForm;