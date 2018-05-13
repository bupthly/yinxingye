import { handleActions } from 'redux-actions';
import { GET_QUESTION_LIST_SUCCEEDED, GET_QUESTION_LIST_FAILED } from 'constants/question';
// import { Toast } from 'antd-mobile';

export default handleActions({
    [GET_QUESTION_LIST_SUCCEEDED](state, action) {
        const {question_list: list, page_num: pageNum} = action.data;
        return {
            ...state,
            list: [...state.list, ...list],
            pageNum: pageNum + 1,
            hasEnd: list.length < 10 ? true : false
        }
    },
    [GET_QUESTION_LIST_FAILED](state, action) {
        alert(action.message);
        return state;
    }
}, {
    list: [],
    pageNum: 1,
    hasEnd: false,
})

