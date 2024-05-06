import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";


export const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Título" />
        <TextInput source="description" validate={[required()]} label="Descrição" />
        <ReferenceInput source="categoryId" reference="categorias" />
        <NumberInput source="order" validate={[required()]} label="Ordem" />
      </SimpleForm>
    </Edit>
  )
}
