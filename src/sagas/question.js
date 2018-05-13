import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getJSON } from 'common/dataservice';
import URLS from 'constants/URLS';
import { GET_QUESTION_LIST_REQUESTED, GET_QUESTION_LIST_SUCCEEDED, GET_QUESTION_LIST_FAILED } from 'constants/question';

function* fetchQuestionListData(action) {
    const {payload: {pageNum, callback}} = action;

    try {
        const data = yield call(getJSON, URLS.GET_QUESTION_LIST, {pageNum});
        yield put({
            type: GET_QUESTION_LIST_SUCCEEDED,
            data
        });
    } catch(e) {
        yield put({
            type: GET_QUESTION_LIST_FAILED,
            message: e
        })
    }
    if (typeof callback === 'function') {
        callback();
    }
}

function* fetchQuestionListSaga() {
    yield* takeEvery(GET_QUESTION_LIST_REQUESTED, fetchQuestionListData);
}

export {
    fetchQuestionListSaga
}
