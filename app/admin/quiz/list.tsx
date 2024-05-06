import { Datagrid, List, NumberField, ReferenceField, TextField } from "react-admin";


export const QuizList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id"/>
        <TextField source="title" />
        <ReferenceField source="unitId" reference="unidades"/>
        <NumberField source="order" />
      </Datagrid>
    </List>
  )
}
