import axios from 'axios'

//HTTP Request & Response와 관련된 기본 설정
const config = {
    Url: "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/"
}

//2.API 함수들을 정리
function fetchPboardList() {
    return axios.get(`${config.Url}portfolio/portfolioList`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
    //백틱 es6사용
    //return 해주는것이 핵심
}
function fetchPboardOne(pboardNo) {
    return axios.get(`${config.Url}portfolio/pboardinfo${pboardNo}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
function fetchPboardDel(no) {
    return axios.post(`${config.Url}portfolio/pboarddel${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
function fetchPboardUp(no) {
    return axios.get(`${config.Url}portfolio/pbaordupdate${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//첨부파일내용가져오기
function fetchAttachment(no) {
    return axios.get(`${config.Url}portfolio/attachment${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
function fetchcomment(no) {
    return axios.get(`${config.Url}portfolio/commentList${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
function fetchcommentdel(no) {
    return axios.post(`${config.Url}portfolio/commentdel${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}

//모임
function fetchMeeting() {
    return axios.get(`${config.Url}meeting/meetingList`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}
function fetchmsublist() {
    return axios.get(`${config.Url}meeting/meetingsubList`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}
function fetchMeetinginfo(no) {
    return axios.get(`${config.Url}meeting/meetinginfo${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//모임 신청하기 버튼 처리
function fetchMeetingapply(email) {
    return axios.get(`${config.Url}meeting/meetingapply${email}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//승인 버튼 눌렀을 경우 실행 로직
function fetchApprove(no) {
    return axios.get(`${config.Url}meeting/approve${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//미승인 버튼 이벤트
function fetchUnapprove(no) {
    return axios.get(`${config.Url}meeting/unapprove${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//신청한 모임 목록을 확인
function fetchApproveList(no) {
    return axios.get(`${config.Url}meeting/approvelist${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
function fetchmklist(no) {
    return axios.get(`${config.Url}meeting/mklist${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//해당모임을 삭제하는 로직
function fetchmeetingdel(no) {
    return axios.get(`${config.Url}meeting/meetingdel${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//모임업데이트할때 사용하는 로직
function fetchmtUpdate(no) {
    return axios.get(`${config.Url}meeting/meetingupdate${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
function fetchapprovecount(no) {
    return axios.get(`${config.Url}meeting/meetingcount${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
function fetchentrant(no) {
    return axios.get(`${config.Url}meeting/meetingenter${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}
//모임 waitList 가져오기
function fetchWaitList(no) {
    return axios.get(`${config.Url}meeting/waitList${no}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}

function fetchMeetingend() {
    return axios.get(`${config.Url}meeting/meetingendList`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}





//주은
//1.communityBoard(자유게시판)
//자유게사판 조회
function fetchCommunityBoardList() {
    return axios.get(`${config.Url}community/communityBoardList`)
}
// 자유게시판 상세화면
function fetchCommunityBoardView(boardSq) {
    return axios.get(`${config.Url}community/communityBoardView${boardSq}`)
}
//자유게시판 삭제하기
function fetchCommunityBoardDelete(boardSq) {
    return axios.post(`${config.Url}community/communityBoardDelete${boardSq}`)
}
//자유게시판 수정하기(게시판번호로 객체 값 불러오기 )
function fetchCommunityBoardUpdate(boardSq) {
    return axios.get(`${config.Url}community/communityBoardUpdate${boardSq}`)
}
//첨부파일 가져오기(파일 다운로드)
function fetchCoummunityBoardAttachment(boardSq) {
    return axios.get(`${config.Url}community/communityBoardAttachment${boardSq}`)
}
//댓글 조회하기
function fetchCboardCommentSelectList(cboardNo) {
    return axios.get(`${config.Url}community/commentSelectOne${cboardNo}`)
}
//댓글  삭제하기
function fetchCboardCommentDelete(cboardNo) {
    setTimeout(() => {
        return axios.post(`${config.Url}community/commentDelete${cboardNo}`)
    }, 1000)
}


//공지사항 조회
function fetchNoticeList() {
    return axios.get(`${config.Url}notice/noticeList`)
}
// 공지사항 상세화면
function fetchNoticeView(noticeSq) {
    return axios.get(`${config.Url}notice/noticeView${noticeSq}`)
}
//공지사항 삭제하기
function fetchNoticeDelete(noticeSq) {
    return axios.post(`${config.Url}notice/noticeDelete${noticeSq}`)
}
//공지사항 수정하기(게시판번호로 객체 값 불러오기 )
function fetchNoticeBoardUpdate(noticeSq) {
    return axios.get(`${config.Url}notice/noticeUpdate${noticeSq}`)
}
//첨부파일 가져오기(파일 다운로드)
function fetchNoticeAttachment(noticeSq) {
    return axios.get(`${config.Url}notice/noticeAttachment${noticeSq}`)
}
//댓글 조회하기
function fetchNTboardCommentSelectList(ntBoardNo) {
    return axios.get(`${config.Url}notice/commentSelectOne${ntBoardNo}`)
}
//댓글  삭제하기
function fetchNTboardCommentDelete(ntCommentNo) {
    return axios.post(`${config.Url}notice/commentDelete${ntCommentNo}`)
}

// ItNews
// ItNews 리스트 불러오기
//모임
function fetchItNewsList() {
    return axios.get(`${config.Url}itnews/selectList`);
}
// ItNews 상세화면
function fetchItNewsView(newsSq) {
    return axios.get(`${config.Url}itnews/itnewsView${newsSq}`)
}
//ItNews 삭제하기
function fetchItNewsDelete(newsSq) {
    return axios.post(`${config.Url}itnews/itnewsDelete${newsSq}`)
}
//ItNews 수정하기(게시판번호로 객체 값 불러오기 )
function fetchItNewsUpdate(newsSq) {
    return axios.get(`${config.Url}itnews/itnewsUpdate${newsSq}`)
}
// ItNews 댓글 조회하기
function fetchITCommentSelectList(itnewsNo) {
    return axios.get(`${config.Url}itnews/selectCommentList${itnewsNo}`)
}
//댓글  삭제하기
function fetchItNewsCommentDelete(itCommentNo) {
    return axios.post(`${config.Url}itnews/deleteComment${itCommentNo}`)
}


//현주 //qnaBoard(qna게시판)
//qna 게시판 조회
function fetchQnaBoardList() {
    return axios.get(`${config.Url}qna/qnaboardlist`)
}
//qna게시판 상세화면
function fetchQnaBoardView(qboardNo) {
    return axios.get(`${config.Url}qna/qnaBoardView${qboardNo}`)
}
//qna게시판 삭제하기
function fetchQnaBoardDelete(qboardNo) {
    return axios.post(`${config.Url}qna/qnaBoardDelete${qboardNo}`)
}
//qna게시판 수정하기(게시판번호로 객체 값 불러오기 )
function fetchQnaBoardUpdate(qboardNo) {
    return axios.get(`${config.Url}qna/qnaBoardUpdate${qboardNo}`)
}
//qna게시판 첨부파일 가져오기(파일 다운로드)
function fetchQnaBoardAttachment(qboardNo) {
    return axios.get(`${config.Url}qna/qnaBoardAttachment${qboardNo}`)
}
//qna게시판 댓글 가져오기
function fetchqnacomment(qboardNo) {
    return axios.get(`${config.Url}qna/commentSelectOne${qboardNo}`)
}
//qna게시판 댓글 삭제
function fetchqnacommentdel(qboardCommentNo) {
    setTimeout(() => {
        return axios.post(`${config.Url}qna/commentDelete${qboardCommentNo}`)
    }, 1000)
}
// reference site 리스트 불러오기
function fetchrefList() {
    return axios.get(`${config.Url}ref/selectsite`);
}
// reference site 리스트 불러오기(미승인 만)
function fetchrefListNo() {
    return axios.get(`${config.Url}ref/selectsiteNo`);
}
// reference site 삭제하기
function fetchrefListDelete(refNo) {
    return axios.post(`${config.Url}ref/deletesite${refNo}`)
}
// reference site 상세화면
function fetchrefListView(refNo) {
    return axios.get(`${config.Url}ref/refView${refNo}`)
}
// reference site 수정하기(게시판번호로 객체 값 불러오기 )
function fetchrefListUpdate(refNo) {
    return axios.get(`${config.Url}ref/refUpdate${refNo}`)
}
// reference site 글작성 카운트
function fetchrefCount() {
    return axios.get(`${config.Url}ref/statusCount`);
}

// 민지
// info(취업정보)
// 조회 리스트
function fetchInfoList() {
    return axios.get(`${config.Url}info/infoList`)
}
// 상세화면
function fetchInfoDetail(infoSq) {
    return axios.get(`${config.Url}info/infoDetail${infoSq}`)
}
// 삭제하기
function fetchInfoDelete(infoSq) {
    return axios.post(`${config.Url}info/infoDelete${infoSq}`)
}
// 수정하기(게시판번호로 객체 값 불러오기 )
function fetchInfoUpdate(infoSq) {
    return axios.get(`${config.Url}info/infoUpdate${infoSq}`)
}
//첨부파일 다운로드
function fetchInfoAttachment(infoSq) {
    return axios.get(`${config.Url}info/infoAttachment${infoSq}`)
}


//혜지
//이력서 게시판 리스트
function fetchRboardList() {
    return axios.get(`${config.Url}resume/rboardList`)
}
//이력서 불러오기
function fetchResume(resumeNo) {
    return axios.get(`${config.Url}resume/selectResume/${resumeNo}`)
}
//이력서 리스트 불러오기
function fetchResumeList(memberSq) {
    return axios.get(`${config.Url}resume/resumeList/${memberSq}`)
}
//이력서 삭제하기
function fetchResumeDelete(resumeNo) {
    return axios.get(`${config.Url}resume/deleteResume/${resumeNo}`)
}
//이력서 게시판 상세화면
function fetchRboardView(rboardNo) {
    return axios.get(`${config.Url}resume/rboardView/${rboardNo}`)
}
//이력서 게시판 상세화면(첨부파일)
function fetchRboardAttachment(rboardNo) {
    return axios.get(`${config.Url}resume/rboardAttachment/${rboardNo}`)
}
//이력서 게시판 상세화면(첨부파일)
function fetchRboardDelete(rboardNo) {
    return axios.get(`${config.Url}resume/deleteRboard/${rboardNo}`)
}
//이력서 전문가 리스트
function fetchConsultant() {
    return axios.get(`${config.Url}resume/Consultant`)
}

//나의 이력서 전문가 리스트
function fetchConsultantOne(memberSq) {
    return axios.get(`${config.Url}resume/ConsultantOne/${memberSq}`)
}
//이력서 게시판 상세화면(첨부파일)
function fetchConsultAttachment(consultNo) {
    return axios.get(`${config.Url}resume/consultAttachment/${consultNo}`)
}

//이력서 게시판 댓글
function fetchRboardComment(rboardNo) {
    return axios.get(`${config.Url}resume/selectRboardComment/${rboardNo}`)
}

//이력서 게시판 댓글 삭제
function fetchRboardCommentdel(rboardCommentNo) {
    return axios.post(`${config.Url}resume/deleteRboardComment/${rboardCommentNo}`)
}


export {
    fetchPboardList,
    fetchPboardOne,
    fetchPboardUp,
    fetchPboardDel,
    fetchAttachment,
    fetchcomment,
    fetchcommentdel,
    //모임
    fetchMeeting,
    fetchMeetinginfo,
    fetchmsublist,
    fetchMeetingapply,
    fetchApprove,
    fetchUnapprove,
    fetchApproveList,
    fetchmklist,
    fetchmeetingdel,
    fetchmtUpdate,
    fetchapprovecount,
    fetchentrant,
    fetchWaitList,
    fetchMeetingend,





    //주은
    //자유게사판CommunityBoard
    fetchCommunityBoardList,
    fetchCommunityBoardView,
    fetchCommunityBoardDelete,
    fetchCommunityBoardUpdate,
    fetchCoummunityBoardAttachment,
    fetchCboardCommentSelectList,
    fetchCboardCommentDelete,
    //공지사항 Notice
    fetchNoticeList,
    fetchNoticeView,
    fetchNoticeDelete,
    fetchNoticeBoardUpdate,
    fetchNoticeAttachment,
    fetchNTboardCommentSelectList,
    fetchNTboardCommentDelete,
    // IT소식 ItNews
    fetchItNewsList,
    fetchItNewsView,
    fetchItNewsDelete,
    fetchItNewsUpdate,
    fetchITCommentSelectList,
    fetchItNewsCommentDelete,


    //현주
    //qna게시판
    fetchQnaBoardList,
    fetchQnaBoardView,
    fetchQnaBoardDelete,
    fetchQnaBoardUpdate,
    fetchQnaBoardAttachment,
    fetchqnacomment,
    fetchqnacommentdel,

    fetchrefList,
    fetchrefListNo,
    fetchrefListDelete,
    fetchrefListView,
    fetchrefListUpdate,
    fetchrefCount,

    //민지
    //info 취업정보 
    fetchInfoList,
    fetchInfoDetail,
    fetchInfoDelete,
    fetchInfoUpdate,
    fetchInfoAttachment,


    //혜지
    //이력서게시판
    fetchRboardList,
    fetchResume,
    fetchResumeList,
    fetchResumeDelete,
    fetchRboardView,
    fetchRboardAttachment,
    fetchRboardDelete,
    fetchConsultant,
    fetchConsultAttachment,
    fetchConsultantOne,
    fetchRboardComment,
    fetchRboardCommentdel,

}


