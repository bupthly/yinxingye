const URLS =  {
    GET_KNOWLEDGE_LIST: '/api/knowledge_get.json',
    GET_KNOWLEDGE_DETAIL: '/api/knowledge_detail.json',
    GET_PATIENT_INFO: '/api/patient.json',
    //获取话题下的帖子列表
    GET_POST_BY_TOPIC_URL: '/community-pc-war/post/getPostByTopic.action',
    //根据群发批次获取详情
    GET_GROUP_BATCH_URL: '/community-pc-war/messageChannel/getGroupBatch.action',
    GET_TEACHER_MSG_DETAIL_URL: '/community-pc-war/teachermessage/getTeacherMsgDetail.action',
    GET_SYS_MSG_DETAIL_BY_SYS_MSG_ID_URL: '/community-pc-war/public/getSysMsgDetailBySysMsgId.action',
    //获取帖子详情
    GET_POST_DETAIL_URL: '/community-pc-war/post/retrievePostSlaveByMasterId.action',
	//获取问答详情
	GET_QUESTION_LIST_URL: '/community-pc-war/question/retrieveQuestionById.action',
	//获取分享回答详情
	GET_ANSWER_LIST_URL: '/community-pc-war/question/retrieveAnswerById.action',

    VIDEO_DETAIL_URL: '/community-pc-war/video/videoDetail.action',
    GET_SUGGESTED_VIDEO_LIST_URL: '/community-pc-war/video/getSuggestedVideoList.action',
}

export default URLS;
