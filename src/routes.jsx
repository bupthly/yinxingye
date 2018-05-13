import React from 'react';
import ReactDom from 'react-dom';

//main
import Main from './containers/Main'
import Answers from './containers/answers'
import QuestionList from './containers/questionList'
import Question from './containers/question'
import KnowledgeList from './containers/knowledgeList'
import Knowledge from './containers/knowledge'
import Info from './containers/info'

const routes = [{
    path: '/',
    component: Main,
    indexRoute: {component: Main},
    childRoutes: [
      {
        path: '/answers',
        component: Answers,
        // getComponent: (nextState, cb) {
        //     System.import('./containers/answers', mod => {

        //     })
        // }
        // component: Answers,
        onEnter: (nextState, replace) => {
            stat();
        }
      }, {
        path: '/questionList',
        component: QuestionList
      }, {
        path: '/question/:question_id',
        component: Question
      }, {
        path: '/knowledgeList',
        component: KnowledgeList
      }, {
        path: '/knowledge/:knowledge_id',
        component: Knowledge
      }, {
        path: '/info',
        component: Info
      }
    ]
  }
];

export default routes;
