import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";


export const QuizEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Título" />
        <ReferenceInput source="unitId" reference="unidades" />
        <NumberInput source="order" validate={[required()]} label="Ordem" />
      </SimpleForm>
    </Edit>
  )
}
