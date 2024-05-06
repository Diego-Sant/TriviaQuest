"use client";

import { Admin, Resource } from "react-admin";

import simpleRestProvider from "ra-data-simple-rest";

import { CategoryList } from "./categoria/list";
import { CategoryCreate } from "./categoria/create";
import { CategoryEdit } from "./categoria/edit";

import { UnitList } from "./unidade/list";
import { UnitCreate } from "./unidade/create";
import { UnitEdit } from "./unidade/edit";

import { QuizList } from "./quiz/list";
import { QuizCreate } from "./quiz/create";
import { QuizEdit } from "./quiz/edit";

import { ChallengeList } from "./desafio/list";
import { ChallengeCreate } from "./desafio/create";
import { ChallengeEdit } from "./desafio/edit";

import { ChallengeOptionList } from "./opcao/list";
import { ChallengeOptionCreate } from "./opcao/create";
import { ChallengeOptionEdit } from "./opcao/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
        <Resource name="categorias" 
            recordRepresentation="title" list={CategoryList} 
            create={CategoryCreate} edit={CategoryEdit}
        />
        <Resource name="unidades" 
            recordRepresentation="title" list={UnitList} 
            create={UnitCreate} edit={UnitEdit}
        />
        <Resource name="quizzes" 
            recordRepresentation="title" list={QuizList} 
            create={QuizCreate} edit={QuizEdit}
        />
        <Resource name="desafios" 
            recordRepresentation="question" list={ChallengeList} 
            create={ChallengeCreate} edit={ChallengeEdit}
        />
        <Resource name="opcoes"
            recordRepresentation="text" list={ChallengeOptionList} 
            create={ChallengeOptionCreate} edit={ChallengeOptionEdit}
        />
    </Admin>
  )
}

export default App
