import { Edit, NumberInput, SimpleForm, TextInput, required } from "react-admin";


export const CategoryEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Título" />
        <TextInput source="imageSrc" validate={[required()]} label="Imagem" />
      </SimpleForm>
    </Edit>
  )
}
