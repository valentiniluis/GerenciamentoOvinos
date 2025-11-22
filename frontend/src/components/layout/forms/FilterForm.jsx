import RenderFields from "./RenderFields.jsx";
import InputFilter from "../../UI/InputFilter.jsx";
import SelectFilter from "../../UI/SelectFilter.jsx";


const FilterForm = ({ defaultFields, filterProps, onUpdate }) => {
  const { name: filterProp, options } = filterProps;
  const noFilterApplied = (filterProp === 'nenhuma');

  return (
    <form className="medium-input">
      <RenderFields fields={defaultFields} />
      {!noFilterApplied && (
        <div className="py-4">
          {options === undefined
            // Ao mudar a key dos componentes abaixo, eles são re-executados como na sua primeira execução.
            // Com isso, o valor e state dos filtros é resetado quando a filterProp é modificada
            ? <InputFilter key={filterProp} {...filterProps} updateFilter={onUpdate} />
            : <SelectFilter key={filterProp} {...filterProps} updateFilter={onUpdate} />
          }
        </div>
      )}
    </form>
  );
}

export default FilterForm;