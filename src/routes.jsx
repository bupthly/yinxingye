import React from 'react';
import ReactDom from 'react-dom';

//main
import Main from './containers/Main'
import Answers from './containers/answers'
import QuestionList from './containers/questionList'
import Question from './containers/question'
import QuestionAdd from './containers/questionAdd'
import KnowledgeList from './containers/knowledgeList'
import Knowledge from './containers/knowledge'
import Info from './containers/info'

const routes = [{
    path: '/',
    component: Main,
    indexRoute: {component: KnowledgeList},
    showFooter: true,
    childRoutes: [
      {
        path: '/answers',
        component: Answers,
        onEnter: (nextState, replace) => {
            stat();
        },
        showFooter: false
      }, {
        path: '/questionList',
        component: QuestionList,
        showFooter: true
      }, {
        path: '/question/:question_id',
        component: Question,
        showFooter: false
      }, {
        path: '/questionAdd',
        component: QuestionAdd,
        showFooter: false
      }, {
        path: '/knowledgeList',
        component: KnowledgeList,
        showFooter: true
      }, {
        path: '/knowledge/:knowledge_id',
        component: Knowledge,
        showFooter: false
      }, {
        path: '/info',
        component: Info,
        showFooter: false
      }
    ]
  }
];

export default routes;
