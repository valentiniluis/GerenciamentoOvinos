import InputField from '../../UI/InputField';
import SelectField from '../..//UI/SelectField';
import FormRow from '../..//UI/FormRow';
import FieldWrapper from '../..//UI/FieldWrapper';

const RenderFields = ({ fields }) => {
  return (
    <>
      {
        fields.map(field => (
          <FormRow key={`${field.inputProps.id} Row`}>
            <FieldWrapper 
              wrapperClass={field.wrapper.class}
              fieldSize={field.wrapper.size}
              >
              {field.inputProps.options !== undefined
                ? <SelectField {...field.inputProps} />
                : <InputField {...field.inputProps} />
              }
            </FieldWrapper>
          </FormRow>
        ))
      }
    </>
  );
}

export default RenderFields;