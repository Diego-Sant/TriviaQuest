import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";


export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="question" validate={[required()]} label="Pergunta" />
        <SelectInput source="type" choices={[
          {
          id: "SELECT",
          name: "SELECT"
          },
          {
            id: "ASSIST",
            name: "ASSIST"
            },
        ]} validate={[required()]} />
        <ReferenceInput source="quizId" reference="quizzes" />
        <NumberInput source="order" validate={[required()]} label="Ordem" />
      </SimpleForm>
    </Edit>
  )
}
