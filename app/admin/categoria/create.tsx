import { Create, NumberInput, SimpleForm, TextInput, required } from "react-admin";


export const CategoryCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Título" />
        <TextInput source="imageSrc" validate={[required()]} label="Imagem" />
      </SimpleForm>
    </Create>
  )
}
