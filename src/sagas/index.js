import { fork } from 'redux-saga/effects';

// Use require.context to require sagas automatically
// Ref: https://webpack.github.io/docs/context.html
const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');

export default function* root() {
  for (let i = 0; i < keys.length; i ++) {
    for(var key in context(keys[i])){
       yield fork(context(keys[i])[key]);
    }
  }
}
