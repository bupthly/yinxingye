import React from 'react';
import ReactDom from 'react-dom';

// import {getJSON} from './common/dataService';
// import {envCfg} from './common/envCfg';
// import global from './common/global';
// import util from './common/util';
// import URLS from './constants/URLS';

//main
import Main from './containers/Main'
import Answers from './containers/answers'
import Questions from './containers/questions'
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
        path: '/questions',
        component: Questions
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
