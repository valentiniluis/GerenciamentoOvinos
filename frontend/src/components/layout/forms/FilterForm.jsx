import RenderFields from "./RenderFields";
import InputFilter from "./InputFilter";


const FilterForm = ({ defaultFields, setFilter, filterProps }) => {
  const { name: filterProp } = filterProps;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const filterValue = formData.get(filterProp);
    setFilter(prevFilter => ({ ...prevFilter, filterValue }));
  }

  const noFilterApplied = (filterProp === 'nenhuma');

  return (
    <form className="medium-input" onSubmit={handleSubmit}>
      <RenderFields fields={defaultFields} />
      {noFilterApplied ? null : (
        <div className="py-4">
          <InputFilter {...filterProps} />
        </div>
      )
      }
    </form>
  );
}

export default FilterForm;