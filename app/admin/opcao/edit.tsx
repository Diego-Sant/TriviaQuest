import { BooleanInput, Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";


export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="text" validate={[required()]} label="Texto" />
        <BooleanInput source="correct" label="Resposta Certa" />
        <ReferenceInput source="challengeId" reference="desafios" />
        <TextInput source="imageSrc" label="URL da Imagem" />
        <TextInput source="audioSrc" label="URL do Áudio" />
      </SimpleForm>
    </Edit>
  )
}
